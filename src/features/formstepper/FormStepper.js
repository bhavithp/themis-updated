import React from 'react';
import {useSelector} from 'react-redux';
import { styled } from '@mui/system';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {selectActiveStep} from './formStepperSlice';

const StepperContainer = styled('div')({
  width: "100%",
  padding: "15px"
});


export default function FormStepper({steps}) {
    
  const activeStep = useSelector(selectActiveStep);

  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
}
