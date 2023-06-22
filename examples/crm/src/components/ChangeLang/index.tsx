import React from 'react';
import { withTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ChangeLang = (props: any) => {
    const { t, i18n } = props;
    const [lang, setLang] = React.useState('en');

    const langChange = (e: any) => {
        setLang(e.target.value);
        i18n.changeLanguage(e.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="lang-select-label">
                {t('general.language')}
            </InputLabel>
            <Select
                size="small"
                labelId="lang-select-label"
                value={lang}
                label={t('general.language')}
                onChange={langChange}
            >
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'no'}>Norvegian (Norsk)</MenuItem>
            </Select>
        </FormControl>
    );
};

export default withTranslation('common')(ChangeLang);
