import React from 'react';
// import ChipInput from 'material-ui-chip-input';
import { MuiChipsInput } from 'mui-chips-input'
import styles from './ChipInput.module.css';

export default function ChipInputField(props) {

    return (

        <div className={styles.chipInput}>

            {/* <ChipInput

                id={props.fieldId}
                value={props.value}
                onAdd={props.handleChange}
                onDelete={props.onDelete}
                onBeforeAdd={props.onBeforeAdd}
                label={props.label}
                helperText={props.helperText}
            /> */}

            <MuiChipsInput

                id={props.fieldId}
                value={props.value}
                // onAdd={props.handleChange}
                // onDelete={props.onDelete}
                // onBeforeAdd={props.onBeforeAdd}
                label={props.label}
                helperText={props.helperText}
                style={props.style}
            />

        </div>

    );
}


