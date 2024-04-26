import { createSlice } from '@reduxjs/toolkit';
import MiaService from '../../services/MiaService';
import { handleErr } from '../../utilities/ErrorHandler';

export const codesSelectorSlice = createSlice({
    name: 'codesselector',
    initialState: {
        selectedCodes: [],
        invalidCodes: [],
        selectComponentScreen: true,
        createIssuesScreen: false,
        reviewAndSubmitScreen: false,
        continueButton: false,
        queueList: [],
        productTeam: null,
        issueTypes: null,
        issuePriorities: null,
        techCustSupportReview: null,
        issueDescription: null,
        issueLabels: [],
        selectedCodeToCreateIssue: [],
        issuesList: [],
        sendIssuesToJira: [],
        unselectedRows: [],
        completed: false,
        sendToJiraStatus: false,
        error: {
            errorStatus: false,
            errorMessage: '',
            statusCode: ''
        }
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSendToJiraStatus: (state, action) => {
            state.sendToJiraStatus = action.payload;
        },
        setCompleted: (state, action) => {
            state.completed = action.payload;
        },
        setUnselectedRows: (state, action) => {
            state.unselectedRows.push(action.payload)
        },
        setInvalidCodes: (state, action) => {
            state.invalidCodes = action.payload
        },
        setIssuesToJira: (state, action) => {
            state.sendIssuesToJira = action.payload
        },
        setIssuesList: (state, action) => {
            state.issuesList.push(action.payload)
        },
        unsetIssuesList: (state, action) => {
            var toRemoveRow = action.payload.id;
            for (var value in state.issuesList) {
                if (toRemoveRow === state.issuesList[value].id) {
                    var index = state.issuesList.indexOf(state.issuesList[value]);
                    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                        state.issuesList.splice(index, 1)
                    }
                }
            }
        },
        setCodes: (state, action) => {
            var code = action.payload;
            state.selectedCodes.push(code);
        },
        unsetCodes: (state, action) => {
            var toRemoveCode = action.payload.code;
            for (var value in state.selectedCodes) {
                if (toRemoveCode === state.selectedCodes[value].code) {
                    var index = state.selectedCodes.indexOf(state.selectedCodes[value]);
                    // console.log('index: ', index);           
                    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                        state.selectedCodes.splice(index, 1)
                    }
                }
            }
        },
        unsetSelectedCodesAtInitialStage: (state, action) => {

            var temp = state.selectedCodes;
            for (var value in temp) {
                var index = temp.indexOf(temp[value]);
                state.selectedCodes.splice(index);
            }

        },
        setSelectComponentScreen: (state, action) => {
            state.selectComponentScreen = action.payload
        },
        setCreateIssuesScreen: (state, action) => {
            state.createIssuesScreen = action.payload
        },
        setReviewAndSubmitScreen: (state, action) => {
            state.reviewAndSubmitScreen = action.payload
        },
        setContinueButtonDisplayStatus: (state, action) => {
            state.continueButton = action.payload
        },
        setQueueList: (state, action) => {
            var issue = action.payload;
            state.queueList.push(issue)
        },
        setJiraIssueId: (state, action) => {

            var updatedIssueGroupNo = action.payload.fields.customfield_10906[0];
            var updatedIssueProductCode = action.payload.fields.customfield_10871;
            var issueId = action.payload.key;
            var index = null;

            for (var issues in state.queueList) {

                if (state.queueList[issues].groupNo === updatedIssueGroupNo) {

                    for (var values in state.queueList[issues].selectedProductCodes) {

                        var selectedIssue = state.queueList[issues].selectedProductCodes[values].product_code;

                        if (updatedIssueProductCode === selectedIssue) {
                            index = state.queueList[issues].selectedProductCodes.indexOf(state.queueList[issues].selectedProductCodes[values]);
                            state.queueList[issues].selectedProductCodes[values].code['jira_issue_id'] = issueId;
                        }

                    }

                    if (state.queueList[issues].selectedProductCodes.length === 0) {
                        index = state.queueList.indexOf(state.queueList[issues])
                        state.queueList.splice(index, 1)
                    }

                }
            }
        },
        destructureQueueList: (state, action) => {

            var toRemoveAndCreateNewGroupIssue = action.payload;
            var index = null;

            for (var issues in state.queueList) {

                for (var values in state.queueList[issues].selectedProductCodes) {
                    if (toRemoveAndCreateNewGroupIssue.product_code === state.queueList[issues].selectedProductCodes[values].code && toRemoveAndCreateNewGroupIssue.group_no === state.queueList[issues].groupNo) {
                        index = state.queueList[issues].selectedProductCodes.indexOf(state.queueList[issues].selectedProductCodes[values]);
                        state.queueList[issues].selectedProductCodes.splice(index, 1)
                    }
                }

                if (state.queueList[issues].selectedProductCodes.length === 0) {
                    index = state.queueList.indexOf(state.queueList[issues])
                    state.queueList.splice(index, 1)
                }
            }

            var tempAddingNewGroup = {
                'groupNo': state.queueList.length + 1,
                'selectedProductCodes': [{ 'code': toRemoveAndCreateNewGroupIssue.product_code, 'delivery_format': toRemoveAndCreateNewGroupIssue.delivery_format, 'name': toRemoveAndCreateNewGroupIssue.name, 'series': toRemoveAndCreateNewGroupIssue.content_series, 'type': toRemoveAndCreateNewGroupIssue.content_type }],
                'selectedProductTeam': toRemoveAndCreateNewGroupIssue.product_team,
                'selectedIssueType': toRemoveAndCreateNewGroupIssue.issue_type,
                'selectedIssuePriorities': toRemoveAndCreateNewGroupIssue.issue_priority,
                'selectedTechCustSupportReview': toRemoveAndCreateNewGroupIssue.tech_support_review,
                'enteredIssueDescription': toRemoveAndCreateNewGroupIssue.issue_description
            }

            state.queueList.push(tempAddingNewGroup);

            for (var value in state.issuesList) {
                if (toRemoveAndCreateNewGroupIssue.product_code === state.issuesList[value].product_code && state.issuesList[value].group_no === toRemoveAndCreateNewGroupIssue.group_no) {
                    index = state.issuesList.indexOf(state.issuesList[value]);
                    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                        state.issuesList.splice(index, 1)
                    }
                }
            }
        },
        setProductTeam: (state, action) => {
            state.productTeam = action.payload
        },
        setIssueTypes: (state, action) => {
            state.issueTypes = action.payload
        },
        setIssuePriorities: (state, action) => {
            state.issuePriorities = action.payload
        },
        setTechCustSupportReview: (state, action) => {
            state.techCustSupportReview = action.payload
        },
        setIssueDescription: (state, action) => {
            console.log(action.payload);
            state.issueDescription = action.payload
        },
        setIssueLabels: (state, action) => {
         
            if(Array.isArray(action.payload)) {
                state.issueLabels = action.payload;
            } else {    
                state.issueLabels.push(action.payload);
            }
        },
        unsetIssueLabels: (state, action) => {
            state.issueLabels.splice(action.payload, 1)
        },
        setSelectedCodeToCreateIssue: (state, action) => {
            var code = action.payload;
            state.selectedCodeToCreateIssue.push(code);
        },
        unsetSelectedCodeToCreateIssue: (state, action) => {
            var toRemoveCode = action.payload.code;
            for (var value in state.selectedCodeToCreateIssue) {
                if (toRemoveCode === state.selectedCodeToCreateIssue[value].code) {
                    var index = state.selectedCodeToCreateIssue.indexOf(state.selectedCodeToCreateIssue[value]);
                    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
                        state.selectedCodeToCreateIssue.splice(index, 1)
                    }
                }
            }

        }
    }

});

export const {
    setError,
    setSendToJiraStatus,
    setCompleted,
    setUnselectedRows,
    setInvalidCodes,
    destructureQueueList,
    setIssuesList,
    unsetIssuesList,
    setCodes,
    unsetCodes,
    setSelectComponentScreen,
    setReviewAndSubmitScreen,
    setContinueButtonDisplayStatus,
    setQueueList,
    setJiraIssueId,
    setProductTeam,
    setIssueTypes,
    setIssueDescription,
    setIssueLabels,
    unsetIssueLabels,
    setIssuePriorities,
    setTechCustSupportReview,
    setSelectedCodeToCreateIssue,
    unsetSelectedCodeToCreateIssue,
    setCreateIssuesScreen,
    unsetSelectedCodesAtInitialStage

} = codesSelectorSlice.actions;


export const sendIssuesRequest = (issues) => dispatch => {

    dispatch(setSendToJiraStatus(true));
    MiaService.sendIssuesDetails(issues)
        .then(res => {
            var results = JSON.parse(res.data.response_jql_data);
            results.issues.forEach(element => {

                var rowKeyId = element.fields.customfield_10906[0] + '_' + element.fields.customfield_10871;
                dispatch(setUnselectedRows(rowKeyId));
                dispatch(setJiraIssueId(element))
                dispatch(unsetIssuesList({ 'id': rowKeyId }))

            });
            dispatch(setSendToJiraStatus(false));

        })
        .catch(error => {
            console.log('error: ', error);
            dispatch(setError({ errorStatus: true, errorMessage: error, statusCode: handleErr(error).statusCode }));
        });

}

export const getErrorStatus = state => state.issueManagementForm.error;

export const getSendToJiraStatus = state => state.issueManagementForm.sendToJiraStatus;

export const getCompletedStatus = state => state.issueManagementForm.completed;

export const getUnselectedRows = state => state.issueManagementForm.unselectedRows;

export const getInvalidCodes = state => state.issueManagementForm.invalidCodes;

export const getReviewAndSubmitScreenStatus = state => state.issueManagementForm.reviewAndSubmitScreen;

export const getIssuesList = state => state.issueManagementForm.issuesList;

export const getSelectComponentScreenStatus = state => state.issueManagementForm.selectComponentScreen;

export const getContinueButtonStatus = state => state.issueManagementForm.continueButton;

export const getSelectedCodes = state => state.issueManagementForm.selectedCodes;

export const getCreateIssuesScreenStatus = state => state.issueManagementForm.createIssuesScreen;

export const getProductTeam = state => state.issueManagementForm.productTeam;

export const getIssueTypes = state => state.issueManagementForm.issueTypes;

export const getIssueDescription = state => state.issueManagementForm.issueDescription;

export const getIssueLabels = state => state.issueManagementForm.issueLabels;

export const getIssuePriorities = state => state.issueManagementForm.issuePriorities;

export const getTechCustSupportReview = state => state.issueManagementForm.techCustSupportReview;

export const getSelectedCodeToCreateIssue = state => state.issueManagementForm.selectedCodeToCreateIssue;

export const getQueueList = state => state.issueManagementForm.queueList;

export default codesSelectorSlice.reducer;