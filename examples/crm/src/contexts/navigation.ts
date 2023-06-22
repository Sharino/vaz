import { createContext } from 'react';

interface Nav {
    activeStep: number;
    setActiveStep: (step: number) => void;
}

export const NavigationContext = createContext<Nav>({
    activeStep: 0,
    setActiveStep: (step: number) => step,
});
