import { create } from "zustand";

const useTransaction = create((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
  transaction: { jobs: [] },
  setTransaction: (transaction) => set({ transaction }),
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));
export { useTransaction };
