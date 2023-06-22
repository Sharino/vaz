import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import StoreAdmin from './StoreAdmin';
import StoreFront from './StoreFront';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import theme from './theme';
import common_en from '../translations/en.json';
import common_no from '../translations/no.json';
import { useState } from 'react';
import { NavigationContext } from './contexts/navigation';

i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: 'en', // language to use
    resources: {
        en: {
            common: common_en, // 'common' is our custom namespace
        },
        no: {
            common: common_no,
        },
    },
});

const App = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <I18nextProvider i18n={i18next}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <NavigationContext.Provider
                                        value={{ activeStep, setActiveStep }}
                                    >
                                        <StoreFront />
                                    </NavigationContext.Provider>
                                }
                            />
                            <Route path="/admin/*" element={<StoreAdmin />} />
                        </Routes>
                    </BrowserRouter>
                </I18nextProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
