import { create } from "zustand";

const useAlertStore = create((set) => ({
  error: "",
  success: "",
  setSuccess: (value) => set(() => ({ success: value })),
  setError: (value) => set(() => ({ error: value })),
}));

export default useAlertStore;
