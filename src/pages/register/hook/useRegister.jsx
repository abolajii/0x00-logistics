import { create } from "zustand";

const useRegister = create((set) => ({
  formValues: {
    username: "aqquad",
    email: "beejhaiiy@gmail.com",
    password: "Admin12345!",
    businessName: "A-Quad Errands",
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
