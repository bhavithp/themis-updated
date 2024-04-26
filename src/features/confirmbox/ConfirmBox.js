import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCollapse, CardBody } from 'reactstrap';
import Styles from './ConfirmBox.module.css';

function ConfirmBox(props) {
    const {
        buttonLabel_1,
        className,
        title,
        message,
        handleClick,
        customColor,
        collapse,
        collapseMessage,
        icon
    } = props;

    const [modal, setModal] = useState(true);

    const [collapseLabel, setCollapseLabel] = useState("View Technical Details");
    const changeCollapseLabel = (text) => setCollapseLabel(text);

    const toggle = () => setModal(!modal);
    return (
        <div>
            <Modal isOpen={modal} toggle={collapse ? false : toggle} className={className}>
                <ModalHeader toggle={toggle}>
                    {icon ?
                        icon : ''
                    }
                    {' ' + title}
                </ModalHeader>
                <ModalBody className={Styles.error_message_body}>
                    {message}
                </ModalBody>
                <ModalFooter>
                    {collapse ?
                        <div>
                            <p className={Styles.error_message} color="secondary" onClick={() => collapseLabel === "View Technical Details" ? changeCollapseLabel("Close Technical Details") : changeCollapseLabel("View Technical Details")} id="toggler">{collapseLabel}</p>
                            <UncontrolledCollapse toggler="#toggler">
                                <CardBody className={Styles.error_message_body_collapsed} >
                                    {collapseMessage}
                                </CardBody>
                            </UncontrolledCollapse>
                        </div> :
                        <Button color={customColor ? customColor : 'primary'} onClick={handleClick ? handleClick : toggle}>{buttonLabel_1}</Button>
                    }
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ConfirmBox
