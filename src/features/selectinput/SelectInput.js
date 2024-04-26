import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
// import { handleErr } from '../utilities/ErrorHandler';

export default function SelectInput(props) {

    const { id, label, name, value, onChange, options, helperText, style } = props;

    return (
        <FormControl
            variant="standard"
            style={style}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                id={id}
                name={name}
                label={label}
                options={options}
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }


            </MuiSelect>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}