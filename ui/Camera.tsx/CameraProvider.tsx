import { Button } from '@tremor/react';
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import CaptureDialog from './CaptureDialog';
import { generatePreviewUrl, imageSourceToFile, recordedChunksToFile } from './camera.utils';

interface ICameraContext {
  video: boolean;
  isOpen: boolean;
  closeDialog(): void;
  onCapture(data: any, recordedChunks?: BlobPart[] | null): void;
  source?: any;
}

const CameraContext = createContext<ICameraContext>({
  video: false,
  isOpen: false,
  closeDialog: () => { },
  onCapture: () => { },
});

interface CameraProviderProps {
  video: boolean;
  onChange(file: File | null): void
}

function CameraProvider({ children, video, onChange }: PropsWithChildren<CameraProviderProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setImgSrc] = useState<string | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[] | undefined | null>(null);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onCapture = useCallback((data: any, recordedChunks?: BlobPart[]) => {
    closeDialog();
    if (video && recordedChunks) {
      setRecordedChunks(recordedChunks);
      onChange(recordedChunksToFile(recordedChunks))
    } else if (data) {
      setImgSrc(data);
      onChange(imageSourceToFile(data));
    }
  }, [closeDialog, video, onChange]);

  const retake = useCallback(() => {
    setImgSrc(null);
    setRecordedChunks(null);
    setIsOpen(true);
    onChange(null);
  }, [onChange]);


  const videoPreviewUrl = useMemo(() => {
    if (!recordedChunks?.length) return null;
    return generatePreviewUrl(recordedChunks);
  }, [recordedChunks])

  return (
    <CameraContext.Provider value={{
      video,
      isOpen,
      closeDialog,
      onCapture,
    }}>
      <div className='w-full h-48 overflow-hidden bg-white border rounded-tremor-default shadow-tremor-input flex items-center justify-center relative'>

        {
          (source || recordedChunks)
            ? <div className='w-full h-full relative'>
              {(videoPreviewUrl)
                ? <video className='w-full h-full' src={videoPreviewUrl} controls />
                : <img className='w-full h-full object-contain' src={source || ''} alt="Self Video" />
              }
              <Button type="button" className='absolute bottom-2 left-[50%] translate-x-[-50%]' color='red' variant="primary" onClick={retake}>Retake</Button>
            </div>
            : <>
              <Button
                variant='light'
                type='button'
                className='flex items-center justify-center absolute w-full h-full top-0 left-0'
                onClick={() => setIsOpen(true)}
              >
                {video ? 'Record selfie video' : 'Take selfie image'}
              </Button>
              <CaptureDialog />
            </>}
      </div>
      {children}
    </CameraContext.Provider>
  )
}

export const useCameraContext = () => useContext(CameraContext);

export default React.memo(CameraProvider)