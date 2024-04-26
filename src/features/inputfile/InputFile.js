import React from 'react';
import { FormGroup, Input, FormText, Label } from 'reactstrap';
import styles from './InputFile.module.css';


function InputFile({ label, placeholderText }) {
    return (
        <div className={styles.fileInput}>
            <FormGroup>
                <Label for="exampleFile">{label}</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                    {placeholderText}
                </FormText>
            </FormGroup>
        </div>
    );
}

export default React.memo(InputFile);