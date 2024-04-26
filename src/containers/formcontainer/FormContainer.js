import React from 'react';
import styles from './FormContainer.module.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormStepper from '../../features/formstepper/FormStepper';




export function FormContainer({ formTitle, panelTitle, children, form_steps }) {
    return (
        <React.Fragment>filter-label
            <CssBaseline />

            <Container className={styles.form_progress_container} maxWidth="xl">

                <div className={styles.top_panel}>
                    <p className={styles.top_panel_title}>{formTitle}</p>
                    <div className={styles.progress_tracker_container}></div>
                </div>
                <FormStepper steps={form_steps} />

            </Container>

            <div>{children}</div>
        </React.Fragment>

    );
}

export function FormPanel({ panelTitle, children }) {
    return (

        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={styles.flex_main_container}>
                    <div className={styles.top_panel}>
                        <p className={styles.top_panel_title}>{panelTitle}</p>
                    </div>
                    {children}
                </div>
            </Container>
        </React.Fragment>

    );
}


export default FormContainer;