import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import InputBar from '../../../features/inputbar/InputBar';
import { selectRelatedData, selectProductDetails, getSendingToMiaStatus } from '../../../features/inputbar/inputbarSlice';
import { FormPanel } from '../../formcontainer/FormContainer';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import DisplayTable from '../../../features/displaytable/DisplayTable';
import { Label, Alert, Badge } from 'reactstrap';
import { getColumns, createRequiredDataSet } from '../dataProcessing';
import ProgressButton from '../../../features/button/ProgressButton';
import {
    setCodes,
    unsetCodes,
    setSelectComponentScreen,
    setCreateIssuesScreen,
    getSelectedCodes,
    getErrorStatus
} from '../IssueManagementFormSlice';
import Styles from './SelectComponentScreen.module.css';
import CustomSpinner from '../../../features/spinners/CustomSpinners';
import { nextStep } from '../../../features/formstepper/formStepperSlice';
import ActionBar from '../../../features/actionbar/ActionBar';
import ShowErrorDialog from '../../../utilities/ErrorDialog';

//Select Components screen
function SelectComponents() {

    const productData = createRequiredDataSet(useSelector(selectProductDetails));
    const relatedCodes = useSelector(selectRelatedData);
    const selectedCodeStatus = useSelector(getSelectedCodes);
    const invalidCodes = [];
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    const sendToMiaStatus = useSelector(getSendingToMiaStatus);
    const errorState = useSelector(getErrorStatus);

    const headCells = [
      {
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Product Code',
      },
      {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Content Title',
      },
      {
        id: 'series',
        numeric: false,
        disablePadding: true,
        label: 'Content Series',
      },
      {
        id: 'type',
        numeric: false,
        disablePadding: true,
        label: 'Content Type',
      },
      {
        id: 'delivery_format',
        numeric: false,
        disablePadding: true,
        label: 'Delivery Format',
      },
      {
        id: 'program_count',
        numeric: true,
        disablePadding: false,
        label: 'Program Count',
      },
      {
        id: 'program_name',
        numeric: true,
        disablePadding: false,
        label: 'Program Name',
      },
    ];


    for (var e in relatedCodes.invalid_codes) {
        invalidCodes.push(relatedCodes.invalid_codes[e]);
    }
    useEffect(() => {
        setVisible(true);
    }, [relatedCodes]);

    function getSelectedRows(rows, isSelect) {
        console.log(rows);
        var row = rows;
        if (isSelect) {
            dispatch(setCodes(row));
        } else {
            dispatch(unsetCodes(row));
        }
    }

    const setScreensFlag = () => {
        dispatch(setSelectComponentScreen(false));
        dispatch(setCreateIssuesScreen(true));
        dispatch(nextStep());
    }

    return (

        <React.Fragment>
            {
                errorState.errorStatus ?
                    <ShowErrorDialog isErrorCode={errorState.statusCode}
                        isErrorState={errorState}
                        isErrorMessage={errorState.errorMessage.stack}
                    />
                    :
                    <FormPanel panelTitle='Select Components'>
                        <InputBar label='Enter component or content codes' />
                        {sendToMiaStatus === true ? <div className={Styles.spinner}><CustomSpinner /></div> : ''}
                        {invalidCodes.length > 0 ? <Alert color='danger' className={Styles.invalidCodesAlert} isOpen={visible} toggle={onDismiss}><h5>Invalid Code(s) Entered</h5> <ul>{invalidCodes.map(code => (<li>{code}</li>))}</ul> </Alert> : ''}
                        {
                            productData.length > 0 ?
                                <div>
                                    <span>
                                        <Label className='field_label' >Related Components</Label>
                                        <div><Badge color="primary" className={Styles.badge}>Total: {productData.length}</Badge>
                                            <Badge color={productData.length === selectedCodeStatus.length ? 'primary' : 'warning'} className={Styles.badge}>Selected: {selectedCodeStatus.length}</Badge></div>
                                    </span>
                                    <DisplayTable
                                        cols={getColumns()}
                                        key_field='code'
                                        data={productData}
                                        onSelectFunction={getSelectedRows}
                                        headCells={headCells}
                                    // paginationFunction={paginationFactory()} 
                                    />
                                </div> : ''
                        }
                        {selectedCodeStatus.length > 0 ? <ActionBar><ProgressButton buttonLabel='Continue' onClick={setScreensFlag} /></ActionBar> : ''}
                    </FormPanel>
            }
        </React.Fragment>
    );

}

export default SelectComponents;