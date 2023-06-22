import { Typography, Box, Tabs, Tab } from '@mui/material';
import React, { ReactElement } from 'react';
import Company from './company';
import Private from './private';
import { withTranslation } from 'react-i18next';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const GeneralForm = ({ t }: any) => {
    const [formType, setFormType] = React.useState(0);
    const handleFormTypeChange = (
        event: React.SyntheticEvent,
        newValue: number
    ) => {
        setFormType(newValue);
    };

    return (
        <>
            <Typography variant="h5" textAlign="center">
                {t('form.title')}
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Tabs
                        value={formType}
                        onChange={handleFormTypeChange}
                        aria-label="form-type"
                    >
                        <Tab
                            label={t('form.tab.private.title')}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label={t('form.tab.company.title')}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
                <TabPanel value={formType} index={0}>
                    <Private />
                </TabPanel>
                <TabPanel value={formType} index={1}>
                    <Private />
                    {/* <Company /> */}
                </TabPanel>
            </Box>
        </>
    );
};

export default withTranslation('common')(GeneralForm);
