import * as yup from 'yup';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { withTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { NavigationContext } from '../../contexts/navigation';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const YupValidation = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Too Short !')
        .max(30, 'Too Long !')
        .required('Required !'),

    email: yup
        .string()
        .email('Enter a Vaid Email')
        .required('Email is Required'),

    password: yup
        .string()
        .required('Enter Your Password')
        .matches(PasswordRegEx, 'Uppercase Lowercase Special char Required')
        .min(8, 'Password Should be minimum 8 character')
        .max(50, 'Too long'),

    phoneNumber: yup
        .string()
        .matches(phoneNumberRegEx, 'Invalid Phone Number')
        .max(11, 'Invalid Phone Number')
        .required('Required !'),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Password does not matched')
        .required('Confirm Password is Required'),

    // image: yup
    //     .mixed()
    //     .required('File is Required')
    //     .test(
    //         'fileSize',
    //         'File more than 0.5 MB not Allowed',
    //         (value: any) => value && value.size <= 524288
    //     )
    //     .test(
    //         'fileFormat',
    //         'Unsupported Format',
    //         (value: any) => value && SUPPORTED_FORMATS.includes(value.type)
    //     ),

    // website: yup.string().url().required("Website is Required"),

    // select: yup.string().required("Select a Option"),
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
    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const initialValue = {
        name: '',
        email: '',
        phoneNumber: '',
        image: '',
    };

    const handleSubmit = (values: any, props: any) => {
        console.log(values);
        alert(JSON.stringify(values));

        props.resetForm();
    };

    return (
        <React.Fragment>
            <Formik
                initialValues={initialValue}
                validationSchema={YupValidation}
                onSubmit={handleSubmit}
            >
                {(props: any) => {
                    const { name } = props.values;
                    return (
                        <Form>
                            {/* First Way */}
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                value={name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={<ErrorMessage name="name" />}
                                error={
                                    !!props.errors.name && props.touched.name
                                }
                                required
                            />
                            {/* Second Way */}
                            <Field
                                as={TextField}
                                label="Email"
                                type="Email"
                                name="email"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                helperText={<ErrorMessage name="email" />}
                                error={
                                    props.errors.email && props.touched.email
                                }
                            />

                            <Field
                                as={TextField}
                                label="Phone Number"
                                name="phoneNumber"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                helperText={<ErrorMessage name="phoneNumber" />}
                                error={
                                    props.errors.phoneNumber &&
                                    props.touched.phoneNumber
                                }
                            />

                            {/* <Field
                                as={TextField}
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                helperText={<ErrorMessage name="password" />}
                                error={
                                    props.errors.password &&
                                    props.touched.password
                                }
                            />

                            <Field
                                as={TextField}
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                helperText={
                                    <ErrorMessage name="confirmPassword" />
                                }
                                error={
                                    props.errors.confirmPassword &&
                                    props.touched.confirmPassword
                                }
                            /> */}

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
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
        </React.Fragment>
    );
};

export default withTranslation('common')(LoadFormComponent);
