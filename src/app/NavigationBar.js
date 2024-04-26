import React, {useState} from 'react';
import bec_logo from '../bec_license_plate.png';
import {Navbar, NavbarBrand, NavbarToggler, Collapse} from 'reactstrap';
import styles from './NavigationBar.module.css';



function NavigationBar(props) {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (        
        <div className={styles.header_navigation}>
            <Navbar color="light" light expand="md">
            <NavbarBrand><img src={bec_logo} alt="Themis"></img></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar></Collapse>            
            </Navbar>
        </div>
    );
}

export default NavigationBar;