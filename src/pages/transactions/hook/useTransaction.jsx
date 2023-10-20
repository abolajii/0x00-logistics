import { create } from "zustand";

const useTransaction = create((set) => ({
  transaction: { jobs: [] },
  setTransaction: (transaction) => set({ transaction }),
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));
export { useTransaction };
