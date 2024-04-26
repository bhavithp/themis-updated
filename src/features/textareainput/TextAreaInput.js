import React from 'react';
import { TextField } from '@mui/material';

export default function TextAreaInput(props) {

    const { id, label, name, placeholder, onChange, value, helperText, style } = props;
    return (
        <div>
            <TextField
                id={id}
                multiline
                label={label}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                helperText={helperText}
                style={style}
            />
        </div>
    )
}
