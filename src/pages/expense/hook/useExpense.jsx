import { create } from "zustand";

const useExpense = create((set) => ({
  formValues: {
    expense: "",
    amount: "",
  },
  multipleExpenses: [],
  setMultipleExpenses: (multipleExpenses) => set({ multipleExpenses }),
  setFormValue: (field, value) =>
    set((state) => ({
      formValues: { ...state.formValues, [field]: value },
    })),
  expenses: [],
  setExpenses: (expenses) => set({ expenses }),
  clicked: false,
  setClicked: (value) => set({ clicked: value }),
}));
export { useExpense };
