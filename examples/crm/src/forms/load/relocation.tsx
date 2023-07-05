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
        description: yup
            .string()
            .min(3, 'Too Short !')
            .max(30, 'Too Long !')
            .required(t('form.required')),
        loadDescription: yup.string().required(t('form.required')),
        houseType: yup.string().required(t('form.required')),
        isElevator: yup.boolean(),
        onWhichFloorNeedsToBePicked: yup.number().required(t('form.required')),
        howFarCarCanBeParkedPickup: yup.string().required(t('form.required')),
        wouldYouBeAbleToHelpToLoadTheCarPickup: yup.boolean(),
        onWhichFloorNeedsToBeDelivered: yup
            .number()
            .required(t('form.required')),
        howFarCarCanBeParkedDelivered: yup
            .string()
            .required(t('form.required')),
        wouldYouBeAbleToHelpToLoadTheCarDelivered: yup.boolean(),
    });

const LoadFormComponent = (props: any) => {
    const { t } = props;
    const [step2, setStep2] = useLocalStorage('step2', '');
    const { setActiveStep } = useContext(NavigationContext);

    const [data, setData] = useState(JSON.parse(step2));

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
        description: data.description || '',
        loadDescription: data.loadDescription || '',
        houseType: data.houseType || '',
        isElevator: data.isElevator || '',
        onWhichFloorNeedsToBePicked: data.onWhichFloorNeedsToBePicked || '',
        howFarCarCanBeParkedPickup: data.howFarCarCanBeParkedPickup || '',
        wouldYouBeAbleToHelpToLoadTheCarPickup:
            data.wouldYouBeAbleToHelpToLoadTheCarPickup || '',
        onWhichFloorNeedsToBeDelivered:
            data.onWhichFloorNeedsToBeDelivered || '',
        howFarCarCanBeParkedDelivered: data.howFarCarCanBeParkedDelivered || '',
        wouldYouBeAbleToHelpToLoadTheCarDelivered:
            data.wouldYouBeAbleToHelpToLoadTheCarDelivered || '',
    };

    const handleSubmit = (values: any, props: any) => {
        console.log(values);
        setStep2(JSON.stringify(values));
        setActiveStep(2);
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
                        houseType,
                        wouldYouBeAbleToHelpToLoadTheCarPickup,
                        wouldYouBeAbleToHelpToLoadTheCarDelivered,
                    } = props.values;

                    return (
                        <Form>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <FormikMuiTextField name="description" />

                                <FormikMuiTextField name="loadDescription" />

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
                                            {t('form.houseType')}
                                        </InputLabel>
                                        <Select
                                            name="routeSide"
                                            labelId="route-side-select-label"
                                            id="route-side-select"
                                            label={t('form.houseType')}
                                            value={houseType}
                                            onChange={val => {
                                                props.setFieldValue(
                                                    'houseType',
                                                    val.target.value
                                                );
                                            }}
                                            error={!!props.errors.houseType}
                                        >
                                            {houseTypes?.map(type => (
                                                <MenuItem
                                                    key={type.title}
                                                    value={type.key}
                                                >
                                                    {type.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {props.errors.houseType && (
                                            <FormHelperText error>
                                                {props.errors.houseType}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                {/* <TextField
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
                                /> */}

                                {/* <TextField
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
                                /> */}

                                <FormikMuiTextField name="onWhichFloorNeedsToBePicked" />
                                <FormikMuiTextField name="howFarCarCanBeParkedPickup" />

                                <FormGroup sx={{ mb: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    wouldYouBeAbleToHelpToLoadTheCarPickup
                                                }
                                                onChange={e =>
                                                    props.setFieldValue(
                                                        'wouldYouBeAbleToHelpToLoadTheCarPickup',
                                                        e.target.checked
                                                    )
                                                }
                                                inputProps={{
                                                    'aria-label': 'controlled',
                                                }}
                                            />
                                        }
                                        label={t(
                                            'form.wouldYouBeAbleToHelpToLoadTheCarPickup'
                                        )}
                                    />
                                </FormGroup>
                                <FormikMuiTextField name="onWhichFloorNeedsToBeDelivered" />
                                <FormikMuiTextField name="howFarCarCanBeParkedDelivered" />

                                <FormGroup sx={{ mb: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    wouldYouBeAbleToHelpToLoadTheCarDelivered
                                                }
                                                onChange={e =>
                                                    props.setFieldValue(
                                                        'wouldYouBeAbleToHelpToLoadTheCarDelivered',
                                                        e.target.checked
                                                    )
                                                }
                                                inputProps={{
                                                    'aria-label': 'controlled',
                                                }}
                                            />
                                        }
                                        label={t(
                                            'form.wouldYouBeAbleToHelpToLoadTheCarDelivered'
                                        )}
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
