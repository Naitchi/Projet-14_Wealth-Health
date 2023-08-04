// Import Redux
import { configureStore } from '@reduxjs/toolkit';

// Import Slice
import employeesSlice from './employeesSlice';

const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
});

export default store;
