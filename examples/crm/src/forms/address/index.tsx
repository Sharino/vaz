import * as yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { withTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { NavigationContext } from '../../contexts/navigation';
import { useLocalStorage } from '../../hooks/localStorage';
import {
    DELIVERY_TYPE_SMALL,
    DELIVERY_TYPE_TRANSPORT,
    DELIVERY_TYPE_RELOCATION,
    DELIVERY_TYPE_OTHER,
} from '../../config/constants';
import Basic from './basic';

function renderForm({ type }: any) {
    switch (type) {
        case DELIVERY_TYPE_SMALL: {
            return <Basic />;
        }
        case DELIVERY_TYPE_TRANSPORT: {
            return <Basic />;
        }

        case DELIVERY_TYPE_RELOCATION: {
            return <Basic />;
        }

        case DELIVERY_TYPE_OTHER: {
            return <Basic />;
        }

        default:
            return <div>Not Found</div>;
    }
}

const Address = (props: any) => {
    const { t } = props;
    const [step1] = useLocalStorage('step1', '');
    const { activeStep, setActiveStep } = useContext(NavigationContext);
    const [data, setData] = useState(JSON.parse(step1));

    useEffect(() => {
        setData(JSON.parse(step1));
    }, [step1]);

    console.log(data);

    return (
        <>
            {renderForm({
                type: data.type,
            })}
        </>
    );

    // return (
    //     <>
    //         <Formik
    //             initialValues={initialValue}
    //             validationSchema={YupValidation(t)}
    //             onSubmit={handleSubmit}
    //         >
    //             {(props: any) => {
    //                 return (
    //                     <Form>
    //                         TODO
    //                         <Box
    //                             sx={{
    //                                 display: 'flex',
    //                                 gap: 1,
    //                             }}
    //                         >
    //                             <Button
    //                                 variant="outlined"
    //                                 color="primary"
    //                                 fullWidth
    //                                 onClick={() => setActiveStep(1)}
    //                             >
    //                                 {t('form.navigation.back')}
    //                             </Button>
    //                             <Button
    //                                 variant="contained"
    //                                 type="submit"
    //                                 color="primary"
    //                                 fullWidth
    //                             >
    //                                 {t('form.navigation.next')}
    //                             </Button>
    //                         </Box>
    //                     </Form>
    //                 );
    //             }}
    //         </Formik>
    //     </>
    // );
};

export default withTranslation('common')(Address);
