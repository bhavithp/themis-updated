import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import { FormPanel } from '../../formcontainer/FormContainer';
import DisplayTable from '../../../features/displaytable/DisplayTable';
import { getReviewAndSubmitTableColumn, createStoryIssueJson } from '../dataProcessing';
import {
    getQueueList,
    setIssuesList,
    unsetIssuesList,
    getIssuesList,
    getUnselectedRows,
    sendIssuesRequest,
    setCompleted,
    getSendToJiraStatus,
    getErrorStatus
} from '../IssueManagementFormSlice';
import ProgressButton from '../../../features/button/ProgressButton';
import { Badge } from 'reactstrap';
import Styles from './ReviewAndSubmitScreen.module.css';
import CustomSpinner from '../../../features/spinners/CustomSpinners';
import {
    getUserInfo
} from '../../../AppSlice';
import { nextStep } from '../../../features/formstepper/formStepperSlice';
import ProcessAlert from '../../../features/alerts/ProcessAlerts';
import ActionBar from '../../../features/actionbar/ActionBar';
import ConfirmBox from '../../../features/confirmbox/ConfirmBox';
import ShowErrorDialog from '../../../utilities/ErrorDialog';

function ReviewAndSubmit() {

    const dataToReview = useSelector(getQueueList);
    const issuesList = useSelector(getIssuesList);
    const unselectedRowsState = useSelector(getUnselectedRows);
    const sendToJiraStatus = useSelector(getSendToJiraStatus);
    const reporterEmailId = useSelector(getUserInfo).emailid;
    const submissionLimit = 50;
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const [dataForReviewAndSubmitTableData, setDataForReviewAndSubmitTableData] = useState([]);
    const [remainingToProcessData, setRemainingToProcessData] = useState([]);
    const errorState = useSelector(getErrorStatus);
    const [backgroundRow, setBackgroundRow] = useState();

    useEffect(() => {
        if (issuesList.length >= submissionLimit) {
            setConfirm(true);
        } else {
            setConfirm(false);
        }

    }, [issuesList, confirm])

    const headCells = [
        {
            id: 'product_code',
            numeric: false,
            disablePadding: true,
            label: 'Product Code',
        },
        {
            id: 'issue_description',
            numeric: false,
            disablePadding: true,
            label: 'Description',
        },
        {
            id: 'product_team',
            numeric: false,
            disablePadding: true,
            label: 'Product Team',
        },
        {
            id: 'issue_priority',
            numeric: false,
            disablePadding: true,
            label: 'Issue Priority',
        },
        {
            id: 'issue_type',
            numeric: false,
            disablePadding: true,
            label: 'Issue Type',
        },
        {
            id: 'jira_issue_id',
            numeric: true,
            disablePadding: false,
            label: 'JIRA Issue ID',
        }
    ];

    console.log('issueList.length: ', typeof (issuesList.length) + ', length: ' + issuesList.length);

    useEffect(() => {
        console.log("dataToReview changed:", dataToReview);
        
        var remainingToProcess = [];
        var dataForReviewAndSubmitTable = [];
    
        dataToReview.forEach(selectedGroup => {
            selectedGroup.selectedProductCodes.forEach(codes => {
    
                var temp_obj = {
                    'id': codes.id,
                    'product_code': codes.product_code,
                    'issue_reporter': selectedGroup.issueReporter,
                    'name': codes.code.name,
                    'content_type': codes.code.type,
                    'content_series': codes.code.series,
                    'delivery_format': codes.code.delivery_format,
                    'issue_description': selectedGroup.enteredIssueDescription,
                    'issue_labels': selectedGroup.enteredIssueLabels,
                    'product_team': selectedGroup.selectedProductTeam,
                    'issue_priority': selectedGroup.selectedIssuePriorities,
                    'issue_type': selectedGroup.selectedIssueType,
                    'group_no': selectedGroup.groupNo,
                    'tech_support_review': selectedGroup.selectedTechCustSupportReview,
                    'jira_issue_id': codes.code.jira_issue_id ? <p><a rel="noopener noreferrer" target="_blank" href={"https://benchmarkeducation.atlassian.net/browse/" + codes.code.jira_issue_id}>{codes.code.jira_issue_id}</a></p> : ''
                }

                dataForReviewAndSubmitTable.push(temp_obj);

                if(codes.code.jira_issue_id) setBackgroundRow({backgroundColor: "#98FB98"})
    
            });
        });
    
        dataForReviewAndSubmitTable.forEach(element => {
            if (!element.jira_issue_id) {
                remainingToProcess.push(element.product_code);
            }
        });
    
        console.log("dataForReviewAndSubmitTable:", dataForReviewAndSubmitTable);
        console.log("remainingToProcess:", remainingToProcess);
    
        setRemainingToProcessData(remainingToProcess);
    
        if (remainingToProcess.length === 0) {
            dispatch(setCompleted(true));
            dispatch(nextStep());
        }
    
        setDataForReviewAndSubmitTableData([...dataForReviewAndSubmitTable]);
    }, [dataToReview]);
    

    const expandRow = {
        renderer: row => (
            <div>
                <p><b>{`Content Title: `}</b>{row.name}</p>
                <p><b>{`Delivery Format: `}</b>{row.delivery_format}</p>
                <p><b>{`Content Type: `}</b>{row.content_type}</p>
                <p><b>{`Content Series: `}</b>{row.content_series}</p>
            </div>
        ),
        showExpandColumn: true,
    };

    const getSelectedRows = (rows, isSelect, rowIndex) => {

        var row = rows;

        if (row.jira_issue_id === "") {
            if (isSelect) {
                dispatch(setIssuesList(row));
            } else {
                dispatch(unsetIssuesList(row));
            }
        } else {
            return false;
        }

    }

    const sendIssuesToJira = () => {

        var issues = [];
        var selectedProject = `${process.env.REACT_APP_JIRA_PROJECT}`;
        console.log('selectedProject: ', selectedProject);
        var issuePriorityThemisJira = {
            "Tier 1: grammatical/typographical errors": "Lowest",
            "Tier 2: content change requiring editorial supervisor involvement": "High (Major)",
            "Tier 3: content change requiring publisher involvement": "Highest (Critical)"
        };
        for (var issue in issuesList) {
            console.log('issuesList: ', issuesList);
            var storyMetaData = {
                project: selectedProject,
                product_team: issuesList[issue].product_team,
                product_code: issuesList[issue].product_code,
                issue_reporter: issuesList[issue].issue_reporter,
                issue_assignee: issuesList[issue].product_team,
                tech_support_review: issuesList[issue].tech_support_review,
                issue_priority: issuePriorityThemisJira[issuesList[issue].issue_priority],
                issue_source: 'Internal',
                issue_name: issuesList[issue].issue_type + ': ' + issuesList[issue].product_code + ' ( ' + issuesList[issue].issue_priority + ' )',
                issue_description: '*SUMMARY:* \n' + issuesList[issue].issue_description + '\n\n *DETAILS:* \n \n \n \n \n \n \n ---- \n NetSuite Issue Reported by: ' + reporterEmailId + ' \n Content Series: ' + issuesList[issue].content_series + '\n Product Code: ' + issuesList[issue].product_code + '\n Source: Internal',
                parent_issue_id: null,
                issue_group_number: issuesList[issue].group_no,
                issue_labels: issuesList[issue].issue_labels
            };
            var story = createStoryIssueJson(storyMetaData);
            issues.push(story);

        }

        dispatch(sendIssuesRequest({ 'issueUpdates': issues }));

    }

    return (
        <div>
            {
                errorState.errorStatus ?
                    <ShowErrorDialog isErrorCode={errorState.statusCode}
                        isErrorState={errorState}
                        isErrorMessage={errorState.errorMessage.stack}
                    />
                    :
                    <FormPanel panelTitle='Review and Submit'>
                        <div className={Styles.badgeGroup}>
                            <Badge color="primary" className={Styles.badge}>Total: {dataForReviewAndSubmitTableData.length}</Badge>
                            <Badge color={(dataForReviewAndSubmitTableData.length === issuesList.length && issuesList.length < submissionLimit) ? 'primary' : issuesList.length > submissionLimit ? 'danger' : 'warning'} className={Styles.badge}>Selected: {issuesList.length}</Badge>
                            <Badge className={unselectedRowsState.length > 0 ? Styles.badgeSuccess : Styles.badgeSecondary}>Created: {unselectedRowsState.length}</Badge>
                        </div>
                        <DisplayTable
                            cols={getReviewAndSubmitTableColumn()}
                            key_field='id'
                            data={dataForReviewAndSubmitTableData}
                            // paginationFunction={paginationFactory()}
                            customExpandRow={expandRow}
                            onSelectFunction={getSelectedRows}
                            nonselectedRows={unselectedRowsState}
                            selectLimit={5}
                            totalRowSelected={issuesList.length}
                            headCells={headCells}
                            style={backgroundRow}
                        />
                        {sendToJiraStatus === true ? <CustomSpinner /> : ''}
                        {confirm ? <ConfirmBox buttonLabel_1={issuesList.length <= submissionLimit ? 'Submit' : 'Cancel'} title='50 issues per submission' message={issuesList.length <= submissionLimit ? 'Please click Submit to create the selected 50 issues and then select the next batch.' : 'Only 50 issues allowed per submission. Please deselect the additional issues.'} handleClick={issuesList.length <= submissionLimit ? sendIssuesToJira : null} customColor={issuesList.length <= submissionLimit ? 'primary' : 'secondary'} /> : ''}
                        {(issuesList.length > 0 && issuesList.length <= submissionLimit) ? <ActionBar><ProgressButton buttonLabel='Submit' onClick={sendIssuesToJira} /></ActionBar> : ''}
                        {issuesList.length > submissionLimit ? <ProcessAlert color='danger' message='Error! Only 50 issues allowed per submission' show={true} /> : ''}
                        {remainingToProcessData.length === 0 ? <ProcessAlert color='success' message='Success! All issues submitted' /> : ''}
                    </FormPanel>
            }
        </div>
    )
}

export default ReviewAndSubmit
