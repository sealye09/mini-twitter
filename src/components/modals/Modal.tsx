import { cn } from "@/libs/utils";
import React, { FC, ReactNode, useCallback } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  body: ReactNode | ReactNode[];
  footer?: ReactNode | ReactNode[];
  isOpen: boolean;
  actionLabel: string;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  id,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  className,
  ...rest
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <input
        type="checkbox"
        id={`${id}-modal`}
        className="modal-toggle"
        checked={isOpen}
        onChange={() => {}}
      />
      <div className="modal">
        <div className={cn("modal-box", className)}>
          {/* title */}
          <div>
            <h3 className="font-bold text-lg text-center">{title}</h3>
            <label
              htmlFor="register-modal"
              className="btn btn-secondary btn-sm btn-circle capitalize absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </label>
          </div>
          {/* body */}
          <div>
            {body}
            {footer}
          </div>
          <div className={`modal-action`}>
            <label
              htmlFor="register-modal"
              className="btn btn-primary capitalize rounded-full"
              onClick={handleSubmit}
            >
              {actionLabel}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
