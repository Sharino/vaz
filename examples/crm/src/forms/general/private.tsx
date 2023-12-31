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
import FormikMuiDatePicker from '../../components/FormikMuiDatePicker';
import dayjs from 'dayjs';
import { useLocalStorage } from '../../hooks/localStorage';
import {
    DELIVERY_TYPE_OTHER,
    DELIVERY_TYPE_RELOCATION,
    DELIVERY_TYPE_SMALL,
    DELIVERY_TYPE_TRANSPORT,
} from '../../config/constants';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
//1. Define the min date. we format the date to YYYY-MM-DD to exclude the time.
const minPublishDate = dayjs().format('YYYY-MM-DD');

const requiredMsg = 'Required';
const badDateMsg = 'Date should be in the future';

const YupValidation = yup.object().shape({
    type: yup.string().required(requiredMsg),
    pickupDate: yup
        .date()
        .min(minPublishDate, badDateMsg)
        // .max(30, 'Too Long !')
        .required(requiredMsg),
    deliveryDate: yup
        .date()
        .min(minPublishDate, badDateMsg)
        // .max(30, 'Too Long !')
        .required(requiredMsg),
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
    const [step1, setStep1] = useLocalStorage('step1', '');
    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const [data, setData] = React.useState(JSON.parse(step1 || '{}'));

    const [isPickupDateFlexible, setIsPickupDateFlexible] = React.useState(
        !!data.pickupDateFlexible
    );
    const [isDeliveryDateFlexible, setIsDeliveryDateFlexible] = React.useState(
        !!data.deliveryDateFlexible
    );

    const deliverType = [
        {
            key: DELIVERY_TYPE_SMALL,
            title: t('form.deliveryType.small'),
        },
        {
            key: DELIVERY_TYPE_RELOCATION,
            title: t('form.deliveryType.relocation'),
        },
        {
            key: DELIVERY_TYPE_TRANSPORT,
            title: t('form.deliveryType.transport'),
        },
        {
            key: DELIVERY_TYPE_OTHER,
            title: t('form.deliveryType.other'),
        },
    ];

    // const initialValue = {
    //     type: undefined,
    //     pickupDate: undefined,
    //     pickupDateFlexible: undefined,
    //     deliveryDate: undefined,
    //     deliveryDateFlexible: undefined,
    // };
    const initialValue = {
        type: data.type || DELIVERY_TYPE_SMALL,
        pickupDate: dayjs(data.pickupDate) || dayjs(),
        pickupDateFlexible: data.pickupDateFlexible || undefined,
        deliveryDate: dayjs(data.deliveryDate) || dayjs(),
        deliveryDateFlexible: data.deliveryDateFlexible || undefined,
    };

    const handleSubmit = (values: any, props: any) => {
        setStep1(
            JSON.stringify({
                ...values,
                pickupDateFlexible: isPickupDateFlexible
                    ? values.pickupDateFlexible
                    : undefined,
                deliveryDateFlexible: isDeliveryDateFlexible
                    ? values.deliveryDateFlexible
                    : undefined,
            })
        );
        setActiveStep(1);
        // props.resetForm();
    };

    return (
        <>
            <Formik
                initialValues={initialValue}
                validationSchema={YupValidation}
                onSubmit={handleSubmit}
                validateOnChange={false}
                // validateOnBlur={false}
            >
                {(props: FormikProps<any>) => {
                    const {
                        type,
                        pickupDate,
                        pickupDateFlexible,
                        deliveryDate,
                        deliveryDateFlexible,
                    } = props.values;

                    // if (data) {
                    //     props.setValues(JSON.parse(data));
                    // }
                    console.log(props.values);

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
                                        onChange={val =>
                                            props.setFieldValue(
                                                'type',
                                                val.target.value
                                            )
                                        }
                                        error={!!props.errors.type}
                                    >
                                        {deliverType?.map(type => (
                                            <MenuItem
                                                key={type.key}
                                                value={type.key}
                                            >
                                                {type.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {props.errors.type && (
                                        <FormHelperText error>
                                            {props.errors.type}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <FormField
                                label={t('form.tab.private.desiredPickupDate')}
                            >
                                <FormikMuiDatePicker name="pickupDate" />
                                {/* <DateField
                                    size="small"
                                    name="date"
                                    sx={{ width: '100%' }}
                                    label={t('form.tab.private.date')}
                                    onChange={val =>
                                        props.setFieldValue('pickupDate', val)
                                    }
                                    slotProps={{
                                        textField: {
                                            helperText: props.errors.pickupDate,
                                        },
                                    }}
                                /> */}
                            </FormField>

                            <FormGroup sx={{ mb: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!!isPickupDateFlexible}
                                            disabled={
                                                !pickupDate ||
                                                !!props.errors.pickupDate
                                            }
                                            onChange={e =>
                                                setIsPickupDateFlexible(
                                                    e.target.checked
                                                )
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

                            {!!isPickupDateFlexible && (
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
                                            value={pickupDateFlexible}
                                            label={t(
                                                'form.tab.private.flexibleDayAmount'
                                            )}
                                            onChange={val =>
                                                props.setFieldValue(
                                                    'pickupDateFlexible',
                                                    val.target.value
                                                )
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
                                <FormikMuiDatePicker name="deliveryDate" />
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
                                            checked={!!isDeliveryDateFlexible}
                                            onChange={e =>
                                                setIsDeliveryDateFlexible(
                                                    e.target.checked
                                                )
                                            }
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                            disabled={
                                                !deliveryDate ||
                                                !!props.errors.deliveryDate
                                            }
                                        />
                                    }
                                    label={t(
                                        'form.tab.private.isDeliveryDateFlexible'
                                    )}
                                />
                            </FormGroup>

                            {!!isDeliveryDateFlexible && (
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
                                            value={deliveryDateFlexible}
                                            label={t(
                                                'form.tab.private.flexibleDayAmount'
                                            )}
                                            onChange={val =>
                                                props.setFieldValue(
                                                    'deliveryDateFlexible',
                                                    val.target.value
                                                )
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
