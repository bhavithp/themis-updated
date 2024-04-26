import React  from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Styles from'./PopoverBox.module.css';



function PopoverBox (props) {
    const {bodyData, headerText, overlayBodyData, placement} = props;
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title style={{backgroundColor: "#003e62", color: "#dee3ef"}} as="h3">{headerText} </Popover.Title>
          <Popover.Content>
            {bodyData.toString()}
          </Popover.Content>
        </Popover>
      );
      
       return (
        <OverlayTrigger
    //    trigger="click"
        placement={placement}
        delay={{ show: 1000, hide: 1000 }} 
        overlay={popover}>
                <div className={Styles.hover_color}>
                {overlayBodyData}
                </div>
        </OverlayTrigger>
       )
}
export default PopoverBox