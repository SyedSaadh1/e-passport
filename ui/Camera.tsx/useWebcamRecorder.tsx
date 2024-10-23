import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { CAMERA_VIDEO_TYPE } from './camera.constants';
import { downloadRecordVideo, generatePreviewUrl } from './camera.utils';

interface WebcamRecorderHook {
  capturing: boolean;
  recordedChunks: BlobPart[];
  videoPreviewUrl: string | null;
  handleStartCaptureClick: () => void;
  handleStopCaptureClick: () => void;
  handleDownload: () => void;
}

const useWebcamRecorder = (webcamRef: React.RefObject<Webcam>): WebcamRecorderHook => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("::: RECORD URL ::", recordedChunks);
    if (recordedChunks.length) {
      const url = generatePreviewUrl(recordedChunks);
      setVideoPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [recordedChunks]);

  const handleDataAvailable = useCallback(({ data }: BlobEvent) => {
    console.log(":: handleDataAvailable ::", data)
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef?.current?.stream as MediaStream, {
      mimeType: CAMERA_VIDEO_TYPE
    });
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setCapturing(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      downloadRecordVideo(recordedChunks);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return {
    capturing,
    videoPreviewUrl,
    recordedChunks,
    handleStartCaptureClick,
    handleStopCaptureClick,
    handleDownload,
  };
};

export default useWebcamRecorder;
