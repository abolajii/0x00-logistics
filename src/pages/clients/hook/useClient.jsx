import { create } from "zustand";

const useClient = create((set) => ({
  formValues: {
    name: "",
    phone: "",
  },
  setFormValue: (field, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [field]: value },
    })),
  clients: [],
  setClients: (clients) => set({ clients }),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));
export { useClient };
