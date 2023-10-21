import { ChangeEvent, useCallback, useState } from "react";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(files[0]);
    },
    [handleChange]
  );

  return (
    <div className="flex min-w-fit w-5/6 justify-between">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        disabled={disabled}
        onChange={handleFile}
        className="file-input file-input-bordered file-input-secondary max-w-xs"
      />
    </div>
  );
};

export default ImageUpload;
