import { configureStore } from '@reduxjs/toolkit';
import inputbarReducer from '../features/inputbar/inputbarSlice';
import issueManagementFormReducer from '../containers/IssueManagementForm/IssueManagementFormSlice';
import authenticationReducer from '../AppSlice';
import formstepperReducer from '../features/formstepper/formStepperSlice';

export default configureStore({
  reducer: {
    inputbar: inputbarReducer,
    issueManagementForm: issueManagementFormReducer,
    authentication: authenticationReducer,
    formsteps:  formstepperReducer
  },
});
