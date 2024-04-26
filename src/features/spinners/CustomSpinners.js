import React from 'react'
import { Spinner } from 'reactstrap';
import Style from './CustomSpinners.module.css';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/system';

const SpinnerDiv = styled('div')(
    ({ theme }) => `
      color: '#fff',
  `,
  );
 

function CustomSpinners() {
    return (
        <div>
            <Backdrop open={true} className= {Style.backdropSpinner}>
                <SpinnerDiv>
                    <div className = {Style.customSpinner}>
                        <Spinner type="grow" color="primary" className={Style.spinnerCss} />
                        <Spinner type="grow" color="success" className={Style.spinnerCss} />
                        <Spinner type="grow" color="danger" className={Style.spinnerCss}/>
                        <Spinner type="grow" color="warning" className={Style.spinnerCss}/>
                    </div>
                </SpinnerDiv>
            </Backdrop>
        </div>
      
    )
}

export default CustomSpinners
