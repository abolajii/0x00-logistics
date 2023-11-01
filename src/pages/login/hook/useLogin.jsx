import { getUserFromStorage, setUserToStorage } from "../../../helper";

import { create } from "zustand";

const initialUser = getUserFromStorage() || {
  businessName: "",
  username: "",
  openingBalance: 0,
};

const useLogin = create((set) => ({
  totalAmount: 0,
  setTotalAmount: (totalAmount) => set({ totalAmount }),
  formValues: {
    username: "aqquad",
    // email: "beejhaiiy@gmail.com",
    password: "Admin12345!",
  },
  loggedInUser: initialUser,
  setLoggedInUser: (loggedInUser) => {
    if (loggedInUser !== null) {
      setUserToStorage(loggedInUser);
    }
    return set({ loggedInUser });
  },
  setFormValue: (fieldName, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [fieldName]: value },
    })),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));

export { useLogin };
