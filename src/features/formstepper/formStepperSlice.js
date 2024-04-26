import { createSlice } from '@reduxjs/toolkit'; 

export const formStepperSlice = createSlice({
    name: 'formstepper',
    initialState: {
      activeStep: 0,
    },
    reducers: {
      nextStep: state => {
        state.activeStep += 1;
      },
      previousStep: state => {
        state.activeStep -= 1;
      },
      resetSteps:  state => {
        state.activeStep = 0;
      },
    },
  });

  export const { nextStep, previousStep, resetSteps } = formStepperSlice.actions;
  export const selectActiveStep = state => state.formsteps.activeStep;

  export default formStepperSlice.reducer;