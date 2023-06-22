// components/MuiDatePicker.tsx
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
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
        <div className="form-control w-full max-w-xs">
            <DatePicker
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
            />
        </div>
    );
};

export default FormikMuiDatePicker;
