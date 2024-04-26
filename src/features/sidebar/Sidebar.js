import React, {useState} from "react"
import Styles from './Sidebar.module.css'
import DisplayTable from '../displaytable/DisplayTable';
import {getFilterTableColumns} from '../../containers/IssueManagementForm/dataProcessing';
import {useSelector} from 'react-redux';
import {getSelectedCodes} from '../../containers/IssueManagementForm/IssueManagementFormSlice';
// import { textFilter } from 'react-bootstrap-table2-filter';
import { Badge } from "reactstrap";

const Sidebar = (props) => {

    const selectedCodes = useSelector(getSelectedCodes);
    const [isOpen, setIsOpen] = useState(false); 
    const cols = getFilterTableColumns();
    
    const columns = () => {        
        // for(var c in cols){
        //     cols[c].filter = textFilter();
        // }
        return cols;
    };    

    const headCells = [
      {
        id: 'code',
        numeric: false,
        disablePadding: false,
        label: 'Product Code',
      }
    ];
    
    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const expandRow = {
        renderer: row => (
          <div>              
            <p><b>{`Content Title: `}</b>{row.name}</p>
            <p><b>{`Delivery Format: `}</b>{row.delivery_format}</p>
            <p><b>{`Content Type: `}</b>{row.type}</p>
            <p><b>{`Content Series: `}</b>{row.series}</p>
          </div>
        ),
        showExpandColumn: true,
    };


    return(        
        <div>
           <div className={isOpen ? Styles.sidebarClose : Styles.sidebarOpen}>          
                <span className={Styles.spanBadge}>
                    <Badge color="primary" className={Styles.badge}>Total: {selectedCodes.length}</Badge>
                    <Badge color={props.selectedRows.length === selectedCodes.length ? 'primary' : 'warning'} className={Styles.badge}>Selected: {props.selectedRows.length}</Badge>
                </span>
                <div className={Styles.scrollTable}>
                    <DisplayTable
                        key_field = 'code'
                        data = {selectedCodes}
                        cols = { columns() }
                        onSelectFunction = { props.onSelectFunction }
                        selectedRows = {props.selectedRows}                      
                        customExpandRow={ expandRow }      
                        headCells={headCells}        
                    />
                </div>
                <span>
                    <Badge className = {props.selectedRows.length === selectedCodes.length ? Styles.badgePrimary : Styles.badgeWarning } >{props.selectedRows.length}</Badge>
                </span>  
                <span className={Styles.toggleButton} onClick={handleClick}>Codes</span>            
           </div>
        </div>
    )
}

export default Sidebar