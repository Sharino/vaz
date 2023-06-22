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
import { useContext, useState } from 'react';
import { NavigationContext } from '../../contexts/navigation';
import { useLocalStorage } from '../../hooks/localStorage';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const YupValidation = (t: any) =>
    yup.object().shape({
        description: yup
            .string()
            .min(3, 'Too Short !')
            .max(30, 'Too Long !')
            .required('Required !'),

        sizeL: yup.number(),

        sizeB: yup.number(),

        sizeW: yup.number(),

        weight: yup.number().required(t('form.required')),
    });

const FormField = ({ label, children }: { label: string; children: any }) => {
    return (
        <Box>
            <Box mb={1}>
                <Typography>{label}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>{children}</Box>
        </Box>
    );
};

const LoadFormComponent = (props: any) => {
    const { t } = props;
    const [data, setData] = useLocalStorage('step1', '');
    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const [isFlammable, setIsFlammable] = useState(false);

    const initialValue = {
        description: '',
        sizeL: '',
        sizeB: '',
        sizeW: '',
        weight: '',
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
                    const {
                        description,
                        sizeL,
                        sizeB,
                        sizeW,
                        weight,
                    } = props.values;
                    console.log(props);

                    return (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <TextField
                                    multiline
                                    rows={2}
                                    label={t('form.description')}
                                    name="description"
                                    fullWidth
                                    variant="outlined"
                                    value={description}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={
                                        <ErrorMessage name="description" />
                                    }
                                    error={
                                        !!props.errors.description &&
                                        props.touched.description
                                    }
                                    required
                                />

                                <TextField
                                    label={t('form.aproximateSizeL')}
                                    name="sizeL"
                                    fullWidth
                                    variant="outlined"
                                    value={sizeL}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="sizeL" />}
                                    error={
                                        !!props.errors.sizeL &&
                                        props.touched.sizeL
                                    }
                                />

                                <TextField
                                    label={t('form.aproximateSizeB')}
                                    name="sizeB"
                                    fullWidth
                                    variant="outlined"
                                    value={sizeB}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="sizeB" />}
                                    error={
                                        !!props.errors.sizeB &&
                                        props.touched.sizeB
                                    }
                                />

                                <TextField
                                    label={t('form.aproximateSizeW')}
                                    name="sizeW"
                                    fullWidth
                                    variant="outlined"
                                    value={sizeW}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="sizeW" />}
                                    error={
                                        !!props.errors.sizeW &&
                                        props.touched.sizeW
                                    }
                                />

                                <TextField
                                    label={t('form.weight')}
                                    name="weight"
                                    fullWidth
                                    variant="outlined"
                                    value={weight}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="weight" />}
                                    error={
                                        !!props.errors.weight &&
                                        props.touched.weight
                                    }
                                    required
                                />

                                <FormGroup sx={{ mb: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isFlammable}
                                                onChange={e =>
                                                    setIsFlammable(
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
