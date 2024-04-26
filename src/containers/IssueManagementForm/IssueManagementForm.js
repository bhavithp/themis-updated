import React from 'react';
import {useSelector} from 'react-redux';
import FormContainer from '../formcontainer/FormContainer';
import {   
  getSelectComponentScreenStatus,
  getCreateIssuesScreenStatus,
} from './IssueManagementFormSlice';
import CreateIssues from './Screens/CreateIssuesScreen';
import SelectComponents from './Screens/SelectComponentScreen';
import ReviewAndSubmitScreen from './Screens/ReviewAndSubmitScreen';



function IssueManagementForm() {

    const selectComponentScreenFlag = useSelector(getSelectComponentScreenStatus); 
    const createIssuesScreenFlag = useSelector(getCreateIssuesScreenStatus);

    return (
      <div>
          
          <FormContainer formTitle='Internal Issue Management Form' form_steps={['Select Components', 'Create Issues', 'Review and Submit']} >

          { selectComponentScreenFlag === true ? <SelectComponents/> :
            createIssuesScreenFlag === true ? <CreateIssues/> : 
            <ReviewAndSubmitScreen/>
          }
          </FormContainer>     
                    
      </div>
    );
}




export default IssueManagementForm;