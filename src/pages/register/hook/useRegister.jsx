import { create } from "zustand";

const useRegister = create((set) => ({
  formValues: {
    username: "",
    email: "",
    password: "",
    businessName: "",
    // businessType: "",
  },
  setFormValue: (fieldName, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [fieldName]: value },
    })),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));

export { useRegister };
