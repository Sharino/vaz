import * as yup from 'yup';
import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    Tabs,
    Tab,
    Step,
    StepLabel,
    Stepper,
} from '@mui/material';
import { withTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import GeneralForm from './forms/general';
import Load from './forms/load';
import theme from './theme';
import { NavigationContext } from './contexts/navigation';

import {
    GENERAL_STEP,
    LOAD_STEP,
    ADDRESS_STEP,
    REVIEW_STEP,
} from './config/constants';
import ChangeLang from './components/ChangeLang';

function renderStepContent({
    step,
    setActiveStep,
    state,
    isLastStep,
    handleBack,
    index,
}: any) {
    console.log('step', step);

    switch (step) {
        case GENERAL_STEP: {
            return <GeneralForm />;
        }
        case LOAD_STEP: {
            // const { shareholders, displayOptionalForm } = state;
            // const shareholder = shareholders[index] || shareholderModel;
            // if (displayOptionalForm) {
            //   return (
            //     <></>
            //     // <ShareholderOptionalForm
            //     //   shareholder={shareholder}
            //     //   activeStep={step}
            //     //   isLastStep={isLastStep}
            //     //   handleBack={handleBack}
            //     //   setActiveStep={setActiveStep}
            //     // />
            //   );
            // }
            // return (
            //   <ShareholderForm
            //     shareholder={shareholder}
            //     activeStep={step}
            //     isLastStep={isLastStep}
            //     handleBack={handleBack}
            //     setActiveStep={setActiveStep}
            //   />
            // );
            return <Load />;
        }

        case ADDRESS_STEP: {
            // const { accounting } = state;
            return (
                <></>
                //   <AccountingForm
                //     accounting={accounting}
                //     activeStep={step}
                //     isLastStep={isLastStep}
                //     handleBack={handleBack}
                //     setActiveStep={setActiveStep}
                //   />
            );
        }

        //   case REVIEW_STEP:
        //     return (
        //       <ReviewRegistration
        //         activeStep={step}
        //         isLastStep={isLastStep}
        //         handleBack={handleBack}
        //         setActiveStep={setActiveStep}
        //       />
        //     );

        default:
            return <div>Not Found</div>;
    }
}

const BasicFormValidation = (props: any) => {
    const { t } = props;
    const steps = [
        t('form.navigation.general'),
        t('form.navigation.load'),
        t('form.navigation.address'),
    ];

    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const isLastStep = activeStep === steps.length - 1;

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <Grid container>
                <Grid item sm={3} xs={false}></Grid>
                <Grid
                    item
                    sm={6}
                    xs={12}
                    sx={{
                        [theme.breakpoints.down('sm')]: {
                            padding: 1,
                        },
                    }}
                >
                    <Paper>
                        <Box m={5} p={3}>
                            <Stepper
                                activeStep={activeStep}
                                sx={{
                                    padding: theme.spacing(2, 0, 6),
                                }}
                            >
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <React.Fragment>
                                {activeStep === steps.length ? (
                                    <></>
                                ) : (
                                    // <RegisterSuccess
                                    //     setActiveStep={setActiveStep}
                                    // />
                                    <React.Fragment>
                                        {renderStepContent({
                                            step: activeStep,
                                            setActiveStep,
                                            isLastStep,
                                            handleBack,
                                        })}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item sm={3} xs={false}></Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <ChangeLang />
            </Box>
        </>
    );
};

export default withTranslation<any>('common')(BasicFormValidation);
