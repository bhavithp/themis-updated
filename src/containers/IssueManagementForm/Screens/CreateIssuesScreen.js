import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FormPanel } from '../../formcontainer/FormContainer'
import { Grid, Paper } from '@mui/material';
// import InputFile from '../../../features/inputfile/InputFile';
import ProgressButton from '../../../features/button/ProgressButton';
import {
    product_teams,
    issue_types,
    issue_priorities,
    tech_support_review
} from '../dataProcessing';
import Styles from './CreateIssuesScreen.module.css';
import Sidebar from '../../../features/sidebar/Sidebar';
import { Alert } from 'reactstrap';
import {
    setQueueList,
    setProductTeam,
    setIssueTypes,
    setIssueDescription,
    setIssueLabels,
    unsetIssueLabels,
    setIssuePriorities,
    setTechCustSupportReview,
    getProductTeam,
    getIssueTypes,
    getIssuePriorities,
    getTechCustSupportReview,
    getIssueDescription,
    getIssueLabels,
    setSelectedCodeToCreateIssue,
    unsetSelectedCodeToCreateIssue,
    getSelectedCodeToCreateIssue,
    getQueueList,
    setCreateIssuesScreen,
    setSelectComponentScreen,
    setReviewAndSubmitScreen
} from '../IssueManagementFormSlice';
import { getUserInfo } from '../../../AppSlice';
import { nextStep } from '../../../features/formstepper/formStepperSlice';
import MiaService from '../../../services/MiaService';
import ActionBar from '../../../features/actionbar/ActionBar';
import ChipInputField from '../../../features/chipinput/ChipInput'
import ProcessAlert from '../../../features/alerts/ProcessAlerts';
import SelectInput from '../../../features/selectinput/SelectInput';
import TextAreaInput from '../../../features/textareainput/TextAreaInput';
import { styled, width } from '@mui/system';

//Create Issues Screen
function CreateIssuesScreen() {

    const dispatch = useDispatch();
    const selectedProductTeam = useSelector(getProductTeam) || undefined;
    const selectedIssueType = useSelector(getIssueTypes) || undefined;
    const selectedIssuePriorities = useSelector(getIssuePriorities) || undefined;
    const selectedTechCustSupportReview = useSelector(getTechCustSupportReview) || undefined;
    const enteredIssueDescription = useSelector(getIssueDescription);
    const enteredIssueLabels = useSelector(getIssueLabels);
    const codeSelectedToCreateIssue = useSelector(getSelectedCodeToCreateIssue);
    const issuesList = useSelector(getQueueList);
    const currentLogInUser = useSelector(getUserInfo);
    const productTeams = product_teams();
    const issueTypes = issue_types();
    const issuePriorities = issue_priorities();
    const techCustSupportReview = tech_support_review();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [reporterId, setReporterId] = useState(null);
    const [processAlert, setProcessAlert] = useState(false);
    const [processAlertMessage, setProcessAlertMessage] = useState('');

    useEffect(() => {
        var reporter_id = null;
        MiaService.getReporterId(currentLogInUser.emailid)
            .then(res => {
                var result = JSON.parse(res.data.user_info);
                console.log('result: ', result);
                if (result.length > 0) {
                    for (var i in result) {
                        var reporter_key = result[i]['accountId'];
                        var accountType = result[i]['accountType'];
                        if (accountType) {
                            accountType = accountType.toLowerCase();
                        }
                        //We have two account type service desk and atlassian. Service desk don't create the internal issues in JIRA we only create the issue in JIRA from atlassian    
                        if (accountType === 'atlassian' && reporter_key !== '' && reporter_key !== undefined && reporter_key !== null) {
                            reporter_id = reporter_key;
                        } else {
                            //this is the reporter id for JIRA_API user in JIRA
                            //TODO: We need to modify this logic to get the reporter_id by using the JIRA_API user's e-mail
                            //address instead of hard-coding the reporter id
                            reporter_id = '5c081d8d9bb006551dcac0bd';
                        }
                    }
                } else {
                    reporter_id = '5c081d8d9bb006551dcac0bd';
                }

                setReporterId(reporter_id);
                console.log('reporter_id: ', reporter_id);
            })
            .catch(error => {
                console.log('error: ', error);
                return error;
            })
    }, [currentLogInUser])

    const addToQueue = () => {
        var list = [];

        var current_group_no = issuesList.length + 1;
        codeSelectedToCreateIssue.forEach(element => {

            var temp_list = {
                'id': "" + current_group_no + "_" + element.code.substr(2),
                'code': element,
                'product_code': element.code.substr(2)
            }
            list.push(temp_list);
        });
        dispatch(setQueueList({
            'groupNo': "" + current_group_no,
            'issueReporter': reporterId,
            'selectedProductCodes': list,
            'selectedProductTeam': selectedProductTeam,
            'selectedIssueType': selectedIssueType,
            'selectedIssuePriorities': selectedIssuePriorities,
            'selectedTechCustSupportReview': selectedTechCustSupportReview,
            'enteredIssueDescription': enteredIssueDescription,
            'enteredIssueLabels': enteredIssueLabels
        }));

        codeSelectedToCreateIssue.forEach(element => {
            dispatch(unsetSelectedCodeToCreateIssue(element))
        });
        var productTeamElement = document.getElementById('productTeams');
        productTeamElement.value = 'none';
        var issueTypeElement = document.getElementById('issueType');
        issueTypeElement.value = 'none';
        var issuePriorityElement = document.getElementById('issuePriority');
        issuePriorityElement.value = 'none';
        var requireReviewElement = document.getElementById('requireReview');
        requireReviewElement.value = 'none';
        var issueDescription = document.getElementById('issueDescription');
        issueDescription.value = null;

        dispatch(setProductTeam(null));
        dispatch(setIssueTypes(null));
        dispatch(setIssueDescription(null));
        dispatch(setIssuePriorities(null));
        dispatch(setTechCustSupportReview(null));
        dispatch(setIssueLabels([]));

    }


    const setScreensFlag = () => {
        dispatch(setSelectComponentScreen(false));
        dispatch(setCreateIssuesScreen(false));
        dispatch(setReviewAndSubmitScreen(true));
        dispatch(nextStep());

    }

    const sidebarCloseHandler = () => {
        setSidebarOpen(false);
    }

    function getSelectedFilterCodes(rows, isSelect) {
        var row = {
            'code': rows.code,
            'delivery_format': rows.delivery_format,
            'name': rows.name,
            'series': rows.series,
            'type': rows.type
        };

        if (isSelect) {
            dispatch(setSelectedCodeToCreateIssue(row));
        } else {
            dispatch(unsetSelectedCodeToCreateIssue(row));
        }
    }

    function validateInputLabels(chips) {

        if (chips.indexOf(" ") !== -1) {

            setProcessAlert(true);
            setProcessAlertMessage('Issue Labels cannot contain a space!');
            return false;
        } else {
            setProcessAlert(false);
            setProcessAlertMessage('');
            return true;
        }

    }

    let sidebar
    if (sidebarOpen) {
        let rows_codes_selected = [];
        codeSelectedToCreateIssue.forEach(element => {
            rows_codes_selected.push(element.code)
        });
        sidebar = <Sidebar close={sidebarCloseHandler} sidebar={'sidebar'} onSelectFunction={getSelectedFilterCodes} selectedRows={rows_codes_selected} />
    }

    const handleDeleteChip = (chip, index) => {
        console.log('logging chip', chip);
        console.log('logging index', index);
        dispatch(unsetIssueLabels(index));
    }

    return (
        <FormPanel panelTitle='Create Issues'>
            {sidebar}
            <form style={{ marginTop: "35px", marginLeft: "70px" }}>
                <Grid container>
                    <Grid item xs={6}>
                        <SelectInput
                            id='productTeams'
                            name='productTeams'
                            label='Select a Product Team'
                            options={productTeams}
                            value={selectedProductTeam}
                            onChange={e => dispatch(setProductTeam(e.target.value))}
                            helperText="Choose from a list of Product Teams"
                            style={{ width: "80%", margin: "10px" }}
                        />
                        <SelectInput
                            id='issueType'
                            name='issueType'
                            label='Select an Issue Type'
                            options={issueTypes}
                            value={selectedIssueType}
                            onChange={e => dispatch(setIssueTypes(e.target.value))}
                            helperText="Choose from a list of Issue Types"
                            style={{ width: "80%", margin: "10px" }}
                        />
                        <SelectInput
                            id='issuePriority'
                            name='issuePriority'
                            label='Select an Issue Priority'
                            options={issuePriorities}
                            value={selectedIssuePriorities}
                            onChange={e => dispatch(setIssuePriorities(e.target.value))}
                            helperText="Choose from a list of Issue Priorities"
                            style={{ width: "80%", margin: "10px" }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectInput
                            id='requireReview'
                            name='requireReview'
                            label='Require Tech Support Customer Service Review?'
                            options={techCustSupportReview}
                            value={selectedTechCustSupportReview}
                            onChange={e => dispatch(setTechCustSupportReview(e.target.value))}
                            helperText="Choose from a list of Tech Support Reviews options"
                            style={{ width: "80%", margin: "10px" }}
                        />
                        <TextAreaInput
                            rowsMax={4}
                            aria-label="maximum height"
                            id='issueDescription'
                            label='Issue Description'
                            name="issueDescription"
                            placeholder="Issue Description"
                            onChange={e => { dispatch(setIssueDescription(e.target.value)) }}
                            value={enteredIssueDescription}
                            helperText="Enter Issue Description"
                            style={{ width: "80%", margin: "10px" }}
                        />
                        <ChipInputField
                            fieldId='issueLabels'
                            label="Enter Issue Label(s)"
                            value={enteredIssueLabels}
                            handleChange={chips => dispatch(setIssueLabels(chips))}
                            onBeforeAdd={chips => validateInputLabels(chips)}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                            helperText="Type out a label and click enter. Labels cannot have spaces."
                            style={{ width: "80%", margin: "10px" }}
                        />
                    </Grid >
                </Grid>
            </form>
            <div>
                {processAlert ? <ProcessAlert color='danger' message={processAlertMessage} show={true} /> : ''}
                {
                    (codeSelectedToCreateIssue.length > 0 && (selectedProductTeam !== null && selectedProductTeam !== '') && (selectedIssueType !== null && selectedIssueType !== '') && (selectedIssuePriorities !== null && selectedIssuePriorities !== '') && (selectedTechCustSupportReview !== null && selectedTechCustSupportReview !== '') && (enteredIssueDescription !== null && enteredIssueDescription !== '')) ?
                        <ProgressButton onClick={addToQueue} buttonLabel='Add To Queue' /> :
                        <Alert color="danger" className={Styles.customAlert}>Please Select the <b>{codeSelectedToCreateIssue.length === 0 ? 'Codes,' : ''} {(selectedProductTeam === null || selectedProductTeam === '') ? ' Product Team,' : ''} {(selectedIssueType === null || selectedIssueType === '') ? ' Issue Type,' : ''} {(selectedIssuePriorities === null || selectedIssuePriorities === '') ? ' Issue Priority,' : ''} {(selectedTechCustSupportReview === null || selectedTechCustSupportReview === '') ? ' Tech Support Service, ' : ''} {(enteredIssueDescription === null || enteredIssueDescription === '') ? ' Issue Description' : ''}</b> to create Issues</Alert>
                }
            </div>
            <hr className={Styles.hrLine} />
            <div >
                {
                    issuesList.map(issue => (
                        <Grid key={issue.groupNo} tag="button" action style={{ paddingTop: "2%", paddingRight: "2%", paddingLeft: "2%" }} >
                            <div className={Styles.issueForm}>
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
                                        <Paper className={Styles.paper}><b>Product Team:</b>{issue.selectedProductTeam}</Paper>
                                        <Paper className={Styles.paper}><b>Issue Type:</b>{issue.selectedIssueType}</Paper>
                                        <Paper className={Styles.paper}><b>Issue Priority: </b> {issue.selectedIssuePriorities}</Paper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Paper className={Styles.paper}><h1>{issue.selectedProductCodes.length}</h1></Paper>
                                        <Paper className={Styles.paper}>Components</Paper>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    ))
                }
            </div>
            {issuesList.length > 0 ? <ActionBar><ProgressButton buttonLabel='Continue' onClick={setScreensFlag} /></ActionBar> : ''}
        </FormPanel >
    );

}

export default CreateIssuesScreen
