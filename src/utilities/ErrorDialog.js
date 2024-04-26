import React from 'react';
import { useHistory } from "react-router-dom";
import ConfirmBox from '../features/confirmbox/ConfirmBox';

function ShowErrorDialog(props) {
    const {
        isErrorCode,
        isErrorState,
        isErrorMessage,
        messageBody

    } = props;

    //Redirect function on 401 error
    const history = useHistory();
    const routeChange = () => {
        let path = window.location = `${process.env.REACT_APP_MIA_BASE_URL}/?app=${process.env.REACT_APP_THEMIS_ENVIRONMENT}&path=issuemanagement`;
        history.push(path);
    }


    return (
        <React.Fragment>
            {
                isErrorCode === 401 ?
                    <ConfirmBox icon={<svg width="1em" color='#F8981D' height="2em" viewBox="0 0 16 16" class="bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>} title='Something went wrong' message='You are currently logged out. Use the button below to login' handleClick={routeChange} collapse={false} buttonLabel_1="Proceed to MIA to login" customColor='primary' />
                    :
                    <ConfirmBox icon={<svg width="1em" color='#F8981D' height="2em" viewBox="0 0 16 16" class="bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>} buttonLabel_1='Dismiss' title='Something went wrong' message={messageBody || 'Please contact boc@benchmarkeducation.com'} collapse={isErrorState} collapseMessage={isErrorMessage} customColor='secondary' />
            }
        </React.Fragment>
    );
}

export default ShowErrorDialog;