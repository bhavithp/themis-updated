import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {InputGroup,
        InputGroupAddon,
        Button,
        Input,
        Label} from 'reactstrap';
import {selectInputCodes, getRelationships, setInputCodes, setProductDetails} from './inputbarSlice';
import {unsetSelectedCodesAtInitialStage} from './../../containers/IssueManagementForm/IssueManagementFormSlice';
import styles from './InputBar.module.css';

function InputBar({label}) {
    const dispatch = useDispatch();
    const input_code = useSelector(selectInputCodes);

    function transformDelimiterSeparatedStringToArray (textValue) {
        console.log('logging length of textValue', textValue.length);
        if (textValue.length === 0) return [];
        if (Array.isArray(textValue)) return;
    
            console.log('in transform delimiter function');
            console.log('logging text value', textValue);
            
        if(textValue.search(/[\t\n\r|]/g) > -1) {
            let items = textValue.split(/[\t\n\r|]+/g);
            
            items.forEach(function (value, key){
                items[key] = value.trim();
    
            });
    
            return items;
        }
        console.log('logging textValue after transform', [textValue]);
        return [textValue];
    }

    const getRelationshipsData = () => {
        var emptyProductdDetails = '';
        dispatch(setProductDetails(emptyProductdDetails));
        dispatch(unsetSelectedCodesAtInitialStage());
        dispatch(getRelationships( input_code ));        
    }

    return (
        
        <React.Fragment>
            <div  className={styles.bar}>
            <Label className='field_label' for="input_bar_group">{label}</Label>
            <InputGroup id="input_bar_group">
                <Input placeholder="Tab/pipe/newline separated text" type="textarea" onChange={e => dispatch(setInputCodes(transformDelimiterSeparatedStringToArray(e.target.value))) }/>
                { (input_code !== undefined && input_code.length > 0) ?
                <InputGroupAddon addonType="append">
                    <Button color="secondary"  onClick={getRelationshipsData}>+</Button>
                </InputGroupAddon> : ''}
            </InputGroup>  
            </div>             
        </React.Fragment>
    );
}

export default React.memo(InputBar);



