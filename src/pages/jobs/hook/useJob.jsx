// Create a store.js file
import { create } from "zustand";

const useJobStore = create((set) => ({
  deliveryLocations: [{ amount: 0, delivery: "" }],
  setDeliveryLocations: (deliveryLocations) => set({ deliveryLocations }),
  job: {},
  setJob: (job) => set({ job }),
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  step: 1,
  setStep: (step) => set({ step }),
  formValues: {
    customerName: "",
    pickUp: "",
    delivery: "",
    amount: "",
    payer: "",
  },
  setFormValue: (field, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [field]: value },
    })),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));

export { useJobStore };
