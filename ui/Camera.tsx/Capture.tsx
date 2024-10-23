import React, { useEffect } from 'react';
import Webcam from "react-webcam";
import { useCallback, useRef } from "react";
import { Button } from '@tremor/react';
import { useCameraContext } from './CameraProvider';
import useWebcamRecorder from './useWebcamRecorder';


const Capture = () => {
  const { closeDialog: onCancel, onCapture, video } = useCameraContext();
  const webcamRef = useRef<Webcam>(null);
  const {
    capturing,
    recordedChunks,
    handleStartCaptureClick,
    handleStopCaptureClick,
    handleDownload,
  } = useWebcamRecorder(webcamRef);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const onVideoCapture = useCallback(() => {
    onCapture(null, recordedChunks);
  }, [recordedChunks, onCapture]);

  useEffect(() => {
    if (recordedChunks?.length) {
      onVideoCapture();
    }
  }, [recordedChunks, onCapture, onVideoCapture])

  return <div className='min-h-[50vh] w-full h-full relative flex flex-col gap-4'>
    <div className='flex-[1_1_0%] flex flex-col'>
      <Webcam audio={!!video} className='w-full h-full flex-[1_1_0%]' ref={webcamRef} mirrored />
    </div>
    <div className='grid grid-cols-2 z-10 gap-2'>
      {video
        ? <>
          {capturing ? (
            <Button variant="primary" color="red" onClick={handleStopCaptureClick}>Stop Capture</Button>
          ) : (
            <Button variant="primary" onClick={handleStartCaptureClick}>Start Capture</Button>
          )}
        </>
        : <Button variant="primary" onClick={capture}>{'Take a selfie'}</Button>
      }

      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    </div>
  </div>
};
export default Capture;