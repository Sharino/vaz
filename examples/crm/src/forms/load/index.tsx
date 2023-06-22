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
import React, { useContext, useEffect, useState } from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { NavigationContext } from '../../contexts/navigation';
import { useLocalStorage } from '../../hooks/localStorage';
import {
    DELIVERY_TYPE_OTHER,
    DELIVERY_TYPE_RELOCATION,
    DELIVERY_TYPE_SMALL,
    DELIVERY_TYPE_TRANSPORT,
} from '../../config/constants';
import Small from './small';
import Transport from './transport';
import Relocation from './relocation';
import Other from './other';

function renderForm({ type }: any) {
    switch (type) {
        case DELIVERY_TYPE_SMALL: {
            return <Small />;
        }
        case DELIVERY_TYPE_TRANSPORT: {
            return <Transport />;
        }

        case DELIVERY_TYPE_RELOCATION: {
            return <Relocation />;
        }

        case DELIVERY_TYPE_OTHER: {
            return <Other />;
        }

        default:
            return <div>Not Found</div>;
    }
}

const LoadFormComponent = (props: any) => {
    const { t } = props;
    const [step1] = useLocalStorage('step1', '');
    const { activeStep, setActiveStep } = useContext(NavigationContext);
    const [data, setData] = useState(JSON.parse(step1));

    useEffect(() => {
        setData(JSON.parse(step1));
    }, [step1]);

    console.log(data);

    return (
        <>
            {renderForm({
                type: data.type,
            })}
        </>
    );
};

export default withTranslation('common')(LoadFormComponent);
