import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IssueManagementForm from './containers/IssueManagementForm/IssueManagementForm';
import {
  getAuthenticatedUserDetails,
  getAuthenticationStatus,
  getAuthenticationError
} from './AppSlice';
import NavigationBar from './app/NavigationBar';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ShowErrorDialog from './utilities/ErrorDialog';
import './App.css';


function App() {

  const dispatch = useDispatch();
  dispatch(getAuthenticatedUserDetails());
  const authenticationStatus = useSelector(getAuthenticationStatus);
  const errorauthenticationState = useSelector(getAuthenticationError);
  const redirectConfirmation = () => {
    return <Route exact path="/*" render={() => (window.location = `${process.env.REACT_APP_MIA_BASE_URL}/?app=${process.env.REACT_APP_THEMIS_ENVIRONMENT}&path=issuemanagement`)} />
  }


  return (
    <Router>
      <div className="App">
        <NavigationBar />
        {
          authenticationStatus === true ?
            <Route exact path='/issuemanagement' component={IssueManagementForm}></Route> :
            authenticationStatus === false && errorauthenticationState.statusCode === 401 ? redirectConfirmation() :
              errorauthenticationState.statusCode === 504 ?
                <ShowErrorDialog isErrorCode={errorauthenticationState.statusCode}
                  messageBody={`Please verify that you are connected to the internet as well as the Benchmark Education VPN and then refresh the page. \nIf the issue persists, contact BOC Team at boc@benchmarkeducation.com`}
                  isErrorState={errorauthenticationState.errorStatus}
                  isErrorMessage={errorauthenticationState.errorMessage.stack}
                /> : ''
        }
      </div>
    </Router>
  )
}
export default App;