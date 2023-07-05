// components/MuiDatePicker.tsx
import { Box } from '@mui/material';
import { DateField, DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useField, useFormikContext } from 'formik';

// Add a name property and reuse the date picker props.
type Props<TDate> = {
    name: string;
} & DatePickerProps<TDate>;

const FormikMuiDatePicker = <TDate,>({ name, ...props }: Props<TDate>) => {
    // use useField hook to get the state values for this field via the name prop.
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();
    return (
        <Box
            sx={{
                flex: 1,
            }}
        >
            <DateField
                fullWidth
                value={field.value}
                onChange={val => setFieldValue(name, val)}
                slotProps={{
                    textField: {
                        size: 'small',
                        helperText: meta.error,
                        error: !!meta.error,
                    },
                }}
                {...props}
            />
            {/* <DatePicker
                {...props}
                // use the DatePicker component override the value formik state value
                value={field.value}
                // modify the formik sate using setFieldValue
                onChange={val => {
                    setFieldValue(name, val);
                }}
                slotProps={{
                    textField: {
                        size: 'small',
                        helperText: meta.error,
                        error: !!meta.error,
                    },
                }}
            /> */}
        </Box>
    );
};

export default FormikMuiDatePicker;
