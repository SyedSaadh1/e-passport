import { CAMERA_VIDEO_EXTENSION, CAMERA_VIDEO_TYPE } from "./camera.constants";

export const convertBlobIntoFile = (recordedChunks: BlobPart[]) => {
  return new Blob(recordedChunks, { type: CAMERA_VIDEO_TYPE });
}

export const generatePreviewUrl = (recordedChunks: BlobPart[]) => {
  const videoBlob = convertBlobIntoFile(recordedChunks);
  return URL.createObjectURL(videoBlob);
}

export const downloadRecordVideo = (recordedChunks: BlobPart[], filename = '"record.webm"') => {
  const url = generatePreviewUrl(recordedChunks);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  const videoBlob = convertBlobIntoFile(recordedChunks);
  return URL.createObjectURL(videoBlob);
}


export const recordedChunksToFile = (recordedChunks: BlobPart[]) => {
  const blob = convertBlobIntoFile(recordedChunks);
  return blobToFile(blob);
}

export const imageSourceToFile = (url: string) => {
  let arr = url.split(',');
  let mime = arr[0].match(/:(.*?);/)![1];
  let data = arr[1];

  let dataStr = atob(data);
  let n = dataStr.length;
  let dataArr = new Uint8Array(n);

  while (n--) {
    dataArr[n] = dataStr.charCodeAt(n);
  }

  let file = new File([dataArr], `record.webp`, { type: mime });

  return file;
};


export const blobToFile = (blob: Blob): File => {
  const file: any = blob;
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  file.lastModifiedDate = new Date();
  file.name = `record.${CAMERA_VIDEO_EXTENSION}`;
  //Cast to a File() type
  return file as File;
}