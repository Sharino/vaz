import * as yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { withTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { NavigationContext } from '../../contexts/navigation';
import { useLocalStorage } from '../../hooks/localStorage';
import {
    HOUSE_TYPE_MULTIFLOOR,
    HOUSE_TYPE_PRIVATE,
} from '../../config/constants';
import FormikMuiTextField from '../../components/FormikMuiTextField';

const YupValidation = (t: any) =>
    yup.object().shape({
        description: yup.string().required(t('form.required')),
        sizeL: yup.number(),
        sizeB: yup.number(),
        sizeW: yup.number(),
        weight: yup.number(),
        isFlammable: yup.boolean(),
        foto: yup.string(),
    });

const LoadFormComponent = (props: any) => {
    const { t } = props;
    const [data, setData] = useLocalStorage('step1', '');
    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const houseTypes = [
        {
            key: HOUSE_TYPE_PRIVATE,
            title: t('form.privateHouse'),
        },
        {
            key: HOUSE_TYPE_MULTIFLOOR,
            title: t('form.multiFloor'),
        },
    ];

    const initialValue = {
        description: '',
        sizeL: '',
        sizeB: '',
        sizeW: '',
        weight: '',
        isFlammable: '',
        foto: '',
    };

    const handleSubmit = (values: any, props: any) => {
        console.log(values);

        setActiveStep(2);
        props.resetForm();
    };

    return (
        <>
            <Formik
                initialValues={initialValue}
                validationSchema={YupValidation(t)}
                onSubmit={handleSubmit}
            >
                {(props: any) => {
                    const { flammable } = props;
                    return (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    pb: 1,
                                }}
                            >
                                <FormikMuiTextField name="description" />
                                <FormikMuiTextField name="sizeL" />
                                <FormikMuiTextField name="sizeB" />
                                <FormikMuiTextField name="sizeW" />
                                <FormikMuiTextField name="weight" />
                                <FormGroup sx={{ mb: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={flammable}
                                                onChange={e =>
                                                    props.setFieldValue(
                                                        'flammable',
                                                        e.target.checked
                                                    )
                                                }
                                                inputProps={{
                                                    'aria-label': 'controlled',
                                                }}
                                            />
                                        }
                                        label={t('form.isLoadFlammable')}
                                    />
                                </FormGroup>
                                <FormikMuiTextField name="foto" />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={() => setActiveStep(0)}
                                >
                                    {t('form.navigation.back')}
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                >
                                    {t('form.navigation.next')}
                                </Button>
                            </Box>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default withTranslation('common')(LoadFormComponent);
