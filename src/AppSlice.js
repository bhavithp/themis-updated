import { createSlice } from '@reduxjs/toolkit';
import MiaService from './services/MiaService';
import { handleErr } from './utilities/ErrorHandler';

export const appSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuthenticated: null,
        userInfo: null,
        authenticationError: {
            errorStatus: false,
            errorMessage: '',
            statusCode: 0
        }
    },
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setauthenticationError: (state, action) => {
            state.authenticationError = action.payload;
        }
    }

});

export const { setIsAuthenticated, setUserInfo, setauthenticationError } = appSlice.actions;

//Thunk
export const getAuthenticatedUserDetails = () => dispatch => {

    MiaService.getUserInfo()
        .then(res => {
            console.log('res: ', res);
            dispatch(setIsAuthenticated(true));
            dispatch(setUserInfo({ 'username': res.data.data.user.username, 'emailid': res.data.data.user.email, 'fullname': res.data.data.user.preferred_name }))
        })
        .catch(error => {
            console.log("ERROR from AppSlice", error);
            console.log("HANDLEERR from AppSlice", handleErr(error));
            dispatch(setIsAuthenticated(false));
            dispatch(setUserInfo({ 'username': null, 'emailid': null, 'fullname': null }));
            dispatch(setauthenticationError({ errorStatus: true, errorMessage: error, statusCode: handleErr(error).statusCode }));
        });
}

export const getAuthenticationStatus = state => state.authentication.isAuthenticated;

export const getUserInfo = state => state.authentication.userInfo;

export const getAuthenticationError = state => state.authentication.authenticationError;

export default appSlice.reducer;