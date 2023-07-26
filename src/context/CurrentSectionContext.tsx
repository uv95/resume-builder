import { Sections } from '@/utils/types/resumeTypes';
import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

interface ICurrentSectionContext {
  currentSection: Sections | '';
  setCurrentSection: React.Dispatch<React.SetStateAction<Sections | ''>>;
}

export const CurrentSectionContext = createContext<ICurrentSectionContext>({
    currentSection: '',
    setCurrentSection: () => {},
});


export const CurrentSectionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentSection, setCurrentSection] = useState<Sections | ''>('');

    const values = useMemo(
        () => ({
            currentSection,
            setCurrentSection
        }),
        [currentSection]
    )

    return (
        <CurrentSectionContext.Provider
            value={values}
        >
            {children}
        </CurrentSectionContext.Provider>
    );
};
