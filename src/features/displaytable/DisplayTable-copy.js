import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Styles from './DisplayTable.module.css';

 
function DisplayTable(props) {
    
    const {
        cols, 
        key_field, 
        data, 
        onSelectFunction,
        nonselectedRows, 
        paginationFunction, 
        selectedRows, 
        customExpandRow
    } = props;

    const customSelectRow = {

        mode: 'checkbox',
        clickToSelect: true,       
        style: { backgroundColor: '#D3D3D3' },
        onSelect: (row, isSelect, rowIndex, e) => {
            // ...
            if(onSelectFunction){                                   
                if(isSelect === true){ 
                    onSelectFunction(row, isSelect, rowIndex);
                }
                else{
                    onSelectFunction(row, isSelect, rowIndex);
                }               
            }           
        },
        
        onSelectAll: (isSelect, rows, e) => {
            
            rows.forEach(element => {
                var count = 0;                
                if(onSelectFunction){          
                    if(isSelect === true){ 
                        onSelectFunction(element, isSelect, count);
                    }
                    else{
                        onSelectFunction(element, isSelect, count);
                    }                    
                }             
                count ++;
            });
            
        },       
        selected: selectedRows,
        nonSelectable: nonselectedRows,
        nonSelectableStyle: { backgroundColor: '#98FB98' }       

    };
    const columns = () => {    
        for(var c in cols){
            cols[c].filter = textFilter();
        }
        return cols;
    };
    const customPagination = () => {
        if(paginationFunction){
            return paginationFactory();
        }else{            
            return null;
        }
    }
    
    return (
       
        <div className = {Styles.table}>            
            <BootstrapTable 
                keyField = {key_field} 
                data = {data} 
                columns = { columns() } 
                filter = { filterFactory() }
                pagination = { customPagination() }           
                selectRow = { customSelectRow } 
                rowClasses={ Styles.displayTable }
                expandRow={customExpandRow}
            />
        </div>
    );

}

export default DisplayTable;