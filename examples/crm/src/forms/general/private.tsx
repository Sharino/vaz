import * as yup from 'yup';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, Field, Form, FormikProps } from 'formik';
import { withTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { NavigationContext } from '../../contexts/navigation';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const YupValidation = yup.object().shape({
    type: yup.string().required('Required'),
    date: yup
        .date()
        // .min(3, 'Too Short !')
        // .max(30, 'Too Long !')
        .required('Required'),

    // email: yup
    //     .string()
    //     .email('Enter a Vaid Email')
    //     .required('Email is Required'),

    // password: yup
    //     .string()
    //     .required('Enter Your Password')
    //     .matches(PasswordRegEx, 'Uppercase Lowercase Special char Required')
    //     .min(8, 'Password Should be minimum 8 character')
    //     .max(50, 'Too long'),

    // phoneNumber: yup
    //     .string()
    //     .matches(phoneNumberRegEx, 'Invalid Phone Number')
    //     .max(11, 'Invalid Phone Number')
    //     .required('Required !'),

    // confirmPassword: yup
    //     .string()
    //     .oneOf([yup.ref('password')], 'Password does not matched')
    //     .required('Confirm Password is Required'),

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
            <Box mb={0.25}>
                <Typography>{label}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>{children}</Box>
        </Box>
    );
};

const PrivateClientFormComponent = (props: any) => {
    const { t } = props;
    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const [value, setValue] = React.useState(0);
    const [isPickupDateFlexible, setIsPickupDateFlexible] = React.useState(
        false
    );
    const [isDeliveryDateFlexible, setIsDeliveryDateFlexible] = React.useState(
        false
    );
    const [datePFlexibility, setDatePFlexibility] = React.useState('');
    const [dateDFlexibility, setDateDFlexibility] = React.useState('');

    const [isPackingNecessery, setPackingIsNecessery] = React.useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const deliverType = [
        {
            key: 'small',
            title: t('form.deliveryType.small'),
        },
        {
            key: 'relocation',
            title: t('form.deliveryType.relocation'),
        },
        {
            key: 'transport',
            title: t('form.deliveryType.transport'),
        },
        {
            key: 'other',
            title: t('form.deliveryType.other'),
        },
    ];

    // move to separate component
    const handlePickupFlexibleDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsPickupDateFlexible(event.target.checked);
        if (!event.target.checked) {
            setDatePFlexibility('');
        }
    };

    const handleDeliveryFlexibleDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsDeliveryDateFlexible(event.target.checked);
        if (!event.target.checked) {
            setDateDFlexibility('');
        }
    };

    const handleHowMuchDateIsFlexibleChange = (event: SelectChangeEvent) => {
        setDateDFlexibility(event.target.value as string);
    };

    const handlePackingIsNecesseryChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPackingIsNecessery(event.target.checked);
    };

    const initialValue = {
        date: '',
    };

    const handleSubmit = (values: any, props: any) => {
        console.log(values);
        // alert(JSON.stringify(values));

        setActiveStep(1);
        // props.resetForm();
    };

    return (
        <>
            <Formik
                initialValues={initialValue}
                validationSchema={YupValidation}
                onSubmit={handleSubmit}
            >
                {(props: FormikProps<any>) => {
                    console.log(props);
                    const { type, date } = props.values;

                    return (
                        <Form>
                            <Box mb={1}>
                                <FormControl
                                    //   disabled={isDisabled}
                                    fullWidth
                                    size="small"
                                    error={
                                        false
                                        // formik.touched.routeSide && Boolean(formik.errors.routeSide)
                                    }
                                >
                                    <InputLabel id="route-side-select-label">
                                        {t('form.deliveryType.label')}
                                    </InputLabel>
                                    <Select
                                        name="routeSide"
                                        labelId="route-side-select-label"
                                        id="route-side-select"
                                        label={t('form.deliveryType.label')}
                                        value={type}
                                        onChange={props.handleChange}
                                    >
                                        {deliverType?.map(type => (
                                            <MenuItem
                                                key={type.key}
                                                value={type.title}
                                            >
                                                {type.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <FormField
                                label={t('form.tab.private.desiredPickupDate')}
                            >
                                <DateField
                                    size="small"
                                    name="date"
                                    sx={{ width: '100%' }}
                                    label={t('form.tab.private.date')}
                                    onChange={val =>
                                        props.setFieldValue('date', val)
                                    }
                                    slotProps={{
                                        textField: {
                                            helperText: props.errors.date,
                                        },
                                    }}
                                />
                            </FormField>

                            <FormGroup sx={{ mb: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isPickupDateFlexible}
                                            onChange={
                                                handlePickupFlexibleDateChange
                                            }
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label={t(
                                        'form.tab.private.isPickupDateFlexible'
                                    )}
                                />
                            </FormGroup>

                            {isPickupDateFlexible && (
                                <FormField
                                    label={t(
                                        'form.tab.private.howMuchFlexible'
                                    )}
                                >
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">
                                            {t(
                                                'form.tab.private.flexibleDayAmount'
                                            )}
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={datePFlexibility}
                                            label={t(
                                                'form.tab.private.flexibleDayAmount'
                                            )}
                                            onChange={
                                                handleHowMuchDateIsFlexibleChange
                                            }
                                        >
                                            <MenuItem value={1}>
                                                +- 1day
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                +- 2days
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                +- 3days
                                            </MenuItem>
                                            <MenuItem value={4}>
                                                +- 4days
                                            </MenuItem>
                                            <MenuItem value={5}>
                                                +- 5days
                                            </MenuItem>
                                            <MenuItem value={6}>
                                                +- 6days
                                            </MenuItem>
                                            <MenuItem value={7}>
                                                +- 1week
                                            </MenuItem>
                                            <MenuItem value={14}>
                                                +- 2weeks
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormField>
                            )}

                            <FormField
                                label={t(
                                    'form.tab.private.desiredDeliveryDate'
                                )}
                            >
                                <DateField
                                    size="small"
                                    name="date"
                                    sx={{ width: '100%' }}
                                    label={t('form.tab.private.date')}
                                    onChange={val =>
                                        props.setFieldValue('date', val)
                                    }
                                    slotProps={{
                                        textField: {
                                            helperText: props.errors.date,
                                        },
                                    }}
                                />
                            </FormField>

                            {/* <Field
                                as={   <DateField
                                    name="date"
                                    sx={{ width: '100%' }}
                                    label={t('form.tab.private.date')}
                                />}
                                label="Date"
                                type="Date"
                                name="date"
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                helperText={<ErrorMessage name="date" />}
                                error={
                                    props.errors.date && props.touched.date
                                }
                            /> */}
                            <FormGroup sx={{ mb: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isDeliveryDateFlexible}
                                            onChange={
                                                handleDeliveryFlexibleDateChange
                                            }
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label={t(
                                        'form.tab.private.isDeliveryDateFlexible'
                                    )}
                                />
                            </FormGroup>

                            {isDeliveryDateFlexible && (
                                <FormField
                                    label={t(
                                        'form.tab.private.howMuchFlexible'
                                    )}
                                >
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">
                                            {t(
                                                'form.tab.private.flexibleDayAmount'
                                            )}
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={dateDFlexibility}
                                            label={t(
                                                'form.tab.private.flexibleDayAmount'
                                            )}
                                            onChange={
                                                handleHowMuchDateIsFlexibleChange
                                            }
                                        >
                                            <MenuItem value={1}>
                                                +- 1day
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                +- 2days
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                +- 3days
                                            </MenuItem>
                                            <MenuItem value={4}>
                                                +- 4days
                                            </MenuItem>
                                            <MenuItem value={5}>
                                                +- 5days
                                            </MenuItem>
                                            <MenuItem value={6}>
                                                +- 6days
                                            </MenuItem>
                                            <MenuItem value={7}>
                                                +- 1week
                                            </MenuItem>
                                            <MenuItem value={14}>
                                                +- 2weeks
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </FormField>
                            )}

                            {/* <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isPackingNecessery}
                                            onChange={
                                                handlePackingIsNecesseryChange
                                            }
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label={t(
                                        'form.tab.private.isPackingNecesery'
                                    )}
                                />
                            </FormGroup> */}

                            {/* <FormField
                                label={t('form.tab.private.isDateFlexible')}
                            >
                                <DateField
                                    sx={{ width: '100%' }}
                                    label={t('form.tab.private.date')}
                                />
                            </FormField> */}

                            <Box mt={2}>
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

export default withTranslation('common')(PrivateClientFormComponent);
