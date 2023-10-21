import { create } from "zustand";

interface ImageCropModalStore {
  isOpen: boolean;
  value: string;
  setValue: (value: string) => void;
  onOpen: (value: string) => void;
  onClose: () => void;
  onSuccess: (value: string) => string;
}

const useImageCropModal = create<ImageCropModalStore>((set, get) => ({
  isOpen: false,
  value: "",
  setValue: (value: string) => set({ value }),
  onOpen: (value: string) => set({ value, isOpen: true }),
  onClose: () => set({ value: "", isOpen: false }),
  onSuccess: (value: string) => {
    set({ value: "", isOpen: false });
    return value;
  },
}));

export default useImageCropModal;
