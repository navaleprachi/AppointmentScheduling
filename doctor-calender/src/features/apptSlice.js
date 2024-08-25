import { createSlice } from "@reduxjs/toolkit";

const apptSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
  },
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
  },
});

export const { addAppointment } = apptSlice.actions;
export default apptSlice.reducer;
