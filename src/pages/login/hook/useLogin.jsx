import { create } from "zustand";

const useLogin = create((set) => ({
  formValues: {
    username: "aqquad",
    // email: "beejhaiiy@gmail.com",
    password: "Admin12345!",
  },
  loggedInUser: null,
  setLoggedInUser: (loggedInUser) => set({ loggedInUser }),
  setFormValue: (fieldName, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [fieldName]: value },
    })),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));

export { useLogin };
