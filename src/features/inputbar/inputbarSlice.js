import { createSlice } from '@reduxjs/toolkit';
import MiaService from '../../services/MiaService';
import { formatData, uniqueList } from '../../utilities/DataFormation';
import { setError } from '../../containers/IssueManagementForm/IssueManagementFormSlice';
import { handleErr } from '../../utilities/ErrorHandler';

export const inputSlice = createSlice({
  name: 'inputbar',
  initialState: {
    inputCodes: [],
    isLoaded: false,
    isError: false,
    relatedData: [],
    productDetails: [],
    sendingToMiaStatus: false,
    programInformation: []
  },
  reducers: {
    setSendingToMiaStatus: (state, action) => {
      state.sendingToMiaStatus = action.payload;
    },
    isSuccess: state => {
      state.isLoaded = true;
    },
    isError: state => {
      state.isError = true;
    },
    setInputCodes: (state, action) => {
      state.inputCodes = action.payload.filter(el => { return el !== null && el !== ''; });
    },
    setRelatedData: (state, action) => {
      state.relatedData = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setProgramInformation: (state, action) => {
      state.programInformation = action.payload
    }

  }

});

export const { isSuccess, isError, setInputCodes, setRelatedData, setProductDetails, setSendingToMiaStatus, setProgramInformation } = inputSlice.actions;

//Thunk
export const getRelationships = (code) => dispatch => {

  dispatch(setSendingToMiaStatus(true));
  MiaService.getRelatedComponents(code)

    .then(res => {

      dispatch(setRelatedData(res.data));

      if (res.data.relationship_data.length > 0 || res.data.component_data.length) {

        MiaService.getProductDetails(formatData(res.data))

          .then(product_res => {

            MiaService.getProgramComponentsInformation(uniqueList(product_res.data).toString())

              .then(program_res => {

                dispatch(setProgramInformation(program_res.data));
                var tempProgramData = program_res.data.data;
                for (var res in product_res.data.data) {
                  var code = product_res.data.data[res].code.substr(2);
                  if (code in tempProgramData && "delivery_format_cuid" in tempProgramData[code]) {
                    var deliveryFormatCUIDValue = tempProgramData[code].delivery_format_cuid;
                    Object.assign(product_res.data.data[res], { delivery_format_cuid: deliveryFormatCUIDValue });
                  }
                  if (code in tempProgramData && "program_usage" in tempProgramData[code]) {
                    var programCountValue = Object.keys(tempProgramData[code].program_usage).length;
                    Object.assign(product_res.data.data[res], { program_count: programCountValue });
                    var programNames = tempProgramData[code].program_usage;
                    var programArray = [];
                    for (var p in programNames) {
                      programArray.push(programNames[p].program.split(":").pop());
                    }

                    var prog = programArray.map(function (name, index) {
                      return name;
                    })
                    Object.assign(product_res.data.data[res], { program_name: prog });
                  }
                }
                dispatch(setProductDetails(product_res.data));
                dispatch(setSendingToMiaStatus(false));
              }).catch(error => {
                dispatch(setError({ errorStatus: true, errorMessage: error }));
              })

          }).catch(error => {
            dispatch(setError({ errorStatus: true, errorMessage: error }));
          })

      } else {
        dispatch(setSendingToMiaStatus(false));
      }

      dispatch(isSuccess());

    }).catch(error => {
      console.log('error from input slice: ', error);
      dispatch(isError());
      dispatch(setError({ errorStatus: true, errorMessage: error, statusCode: handleErr(error).statusCode }));
    });

}

export const getProgramInformation = state => state.inputbar.programInformation;

export const getSendingToMiaStatus = state => state.inputbar.sendingToMiaStatus;

export const selectInputCodes = state => state.inputbar.inputCodes;

export const selectRelatedData = state => state.inputbar.relatedData;

export const selectProductDetails = state => state.inputbar.productDetails;

export const isDataReturned = state => state.inputbar.isSuccess;

export default inputSlice.reducer;