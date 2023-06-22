// components/MuiDatePicker.tsx
import { TextField, TextFieldProps } from '@mui/material';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { withTranslation } from 'react-i18next';

// Add a name property and reuse the date picker props.
type Props = {
    name: string;
    t: any;
} & TextFieldProps;

const FormikMuiTextField = ({ name, ...props }: Props) => {
    const { t } = props;
    // use useField hook to get the state values for this field via the name prop.
    const [field, meta] = useField(name);
    const { handleChange, handleBlur } = useFormikContext();
    return (
        <TextField
            label={t(`form.${name}`)}
            name={name}
            fullWidth
            variant="outlined"
            value={field.value}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={<ErrorMessage name={name} />}
            error={!!meta.error && meta.touched}
            required
            size="small"
            {...props}
        />
    );
};

export default withTranslation('common')(FormikMuiTextField);
