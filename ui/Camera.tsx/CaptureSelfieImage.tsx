import React from 'react'
import CameraProvider from './CameraProvider'

type Props = {
  video?: boolean
  onChange(file: File): void
}

const CaptureSelfieImage = ({ video = false, onChange }: Props) => {
  return <CameraProvider onChange={onChange} video={video} />
}

export default React.memo(CaptureSelfieImage)