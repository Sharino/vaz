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

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 524288;
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/;
const PasswordRegEx = /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const YupValidation = (t: any) =>
    yup.object().shape({
        country: yup.string().required(t('form.required')),

        street: yup.string().required(t('form.required')),

        houseNum: yup.number(),

        flatNum: yup.number(),

        city: yup.string().required(t('form.required')),

        postCode: yup.string().required(t('form.required')),

        comment: yup.string(),
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

const getCountries = (t: any) => {
    return [
        {
            key: 'NO',
            title: t('countries.no'),
        },
        {
            key: 'LT',
            title: t('countries.lt'),
        },
    ];
};
const LoadFormComponent = (props: any) => {
    const { t } = props;
    const [data, setData] = useLocalStorage('step1', '');
    const { activeStep, setActiveStep } = useContext(NavigationContext);

    const [isFlammable, setIsFlammable] = useState(false);

    const initialValue = {
        country: '',
        street: '',
        houseNum: '',
        flatNum: '',
        city: '',
        postCode: '',
        comment: '',
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
                        country,
                        street,
                        houseNum,
                        flatNum,
                        city,
                        postCode,
                        comment,
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
                                        <InputLabel id="country-select">
                                            {t('form.address.country')}
                                        </InputLabel>
                                        <Select
                                            name="country"
                                            labelId="country-select"
                                            id="country-select"
                                            label={t('form.address.country')}
                                            value={country}
                                            defaultValue={'no'}
                                            onChange={val =>
                                                props.setFieldValue(
                                                    'country',
                                                    val.target.value
                                                )
                                            }
                                            error={!!props.errors.type}
                                        >
                                            {getCountries(t)?.map(country => (
                                                <MenuItem
                                                    key={country.key}
                                                    value={country.key}
                                                >
                                                    {country.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {props.errors.country && (
                                            <FormHelperText error>
                                                {props.errors.country}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                                <TextField
                                    size="small"
                                    label={t('form.address.street')}
                                    name="street"
                                    fullWidth
                                    variant="outlined"
                                    value={street}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="street" />}
                                    error={
                                        !!props.errors.street &&
                                        props.touched.street
                                    }
                                    required
                                />
                                <TextField
                                    size="small"
                                    label={t('form.address.houseNum')}
                                    name="houseNum"
                                    fullWidth
                                    variant="outlined"
                                    value={houseNum}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={
                                        <ErrorMessage name="houseNum" />
                                    }
                                    error={
                                        !!props.errors.houseNum &&
                                        props.touched.houseNum
                                    }
                                />
                                <TextField
                                    size="small"
                                    label={t('form.address.flatNum')}
                                    name="flatNum"
                                    fullWidth
                                    variant="outlined"
                                    value={flatNum}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="flatNum" />}
                                    error={
                                        !!props.errors.flatNum &&
                                        props.touched.flatNum
                                    }
                                />
                                <TextField
                                    size="small"
                                    label={t('form.address.city')}
                                    name="city"
                                    fullWidth
                                    variant="outlined"
                                    value={city}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="city" />}
                                    error={
                                        !!props.errors.city &&
                                        props.touched.city
                                    }
                                    required
                                />
                                <TextField
                                    size="small"
                                    label={t('form.address.postCode')}
                                    name="postCode"
                                    fullWidth
                                    variant="outlined"
                                    value={postCode}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={
                                        <ErrorMessage name="postCode" />
                                    }
                                    error={
                                        !!props.errors.postCode &&
                                        props.touched.postCode
                                    }
                                    required
                                />

                                <TextField
                                    size="small"
                                    multiline
                                    rows={2}
                                    label={t('form.address.comment')}
                                    name="comment"
                                    fullWidth
                                    variant="outlined"
                                    value={comment}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    helperText={<ErrorMessage name="comment" />}
                                    error={
                                        !!props.errors.comment &&
                                        props.touched.comment
                                    }
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    pt: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={() => setActiveStep(1)}
                                >
                                    {t('form.navigation.back')}
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    fullWidth
                                >
                                    {t('form.navigation.send')}
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
