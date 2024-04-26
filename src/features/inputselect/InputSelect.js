import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import styles from './InputSelect.module.css';


function listOptions(options) {

    const optionList = options.map((option, index) =>
        <option key={index}>{option}</option>
    );
    // optionList.push(<option key='empty' value='none'>Select an option</option>);
    return optionList;
}

function InputSelect({ selectOptions, label, handleSelect, fieldId }) {

    const optionsList = listOptions(selectOptions);

    return (

        <div className={styles.selectDropdown}>

            <FormGroup>
                <Label className='field_label' for="exampleSelect">{label}</Label>
                {/* <Input className={styles.input} type="select" name="select" id="exampleSelect" onChange={handleSelect}> */}
                <Input className={styles.input} type="select" name="select" id={fieldId} onChange={handleSelect} >
                    <option key='empty' value='none'>Select an option</option>
                    {optionsList}
                </Input>
            </FormGroup>

        </div>

    );
}

export default InputSelect;
