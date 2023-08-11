import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload.content;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
  },
});

export const { setEmployees, addEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;

export const getEmployees = (state) => state.employees.employees;
