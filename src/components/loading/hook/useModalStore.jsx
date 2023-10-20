import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false, // Initial state is closed

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
