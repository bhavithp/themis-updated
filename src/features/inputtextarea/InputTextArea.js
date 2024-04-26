import React from 'react';
import styles from './InputTextArea.module.css';
import {FormGroup, Label, Input} from 'reactstrap';


function InputTextArea({label, handleChange, fieldId}) {
    return (
        <div className={styles.textAreaInput}>
            <FormGroup>
                <Label for="exampleText">{label}</Label>
                <Input type="textarea" name="text" id={fieldId} onChange={handleChange} />
            </FormGroup>
            
        </div>
    );
}

export default InputTextArea;