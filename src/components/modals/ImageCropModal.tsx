import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  RefObject,
  MutableRefObject,
} from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Modal from "./Modal";

const CropModal = ({
  value,
  onChange,
  onClose,
  isOpen,
}: {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [completedCrop, setCompletedCrop] = useState<Crop>();

  const onFinish = useCallback(() => {
    if (!previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const base64Image = canvas.toDataURL("image/jpeg");
    console.log("🚀 ~ file: ImageCropModal.tsx:36 ~ onFinish ~ base64Image:", base64Image);

    onChange(base64Image);

    onClose();
  }, [completedCrop, crop, imgRef, onChange, onClose, previewCanvasRef]);

  useEffect(() => {
    if (!imgRef.current || !previewCanvasRef.current || !completedCrop) return;

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <Modal
      className="w-11/12 max-w-3xl"
      title="Crop Image"
      id="crop-image-modal"
      body={
        <div className="w-full h-full m-auto pt-10">
          <ReactCrop
            crop={crop}
            aspect={1 / 1}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              src={value}
              ref={imgRef}
            />
          </ReactCrop>

          <canvas
            ref={previewCanvasRef}
            className="hidden"
          />
        </div>
      }
      isOpen={isOpen}
      actionLabel="Crop"
      onClose={onClose}
      onSubmit={onFinish}
    />
  );
};

export default CropModal;
