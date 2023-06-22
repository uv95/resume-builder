import { Sections } from '@/utils/types/resumeTypes';
import React, { createContext, useState } from 'react';

interface ICurrentSectionContext {
  currentSection: Sections | '';
  setCurrentSection: React.Dispatch<React.SetStateAction<Sections | ''>>;
}

export const CurrentSectionContext = createContext<ICurrentSectionContext>({
    currentSection: '',
    setCurrentSection: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const CurrentSectionProvider = ({ children }: Props) => {
    const [currentSection, setCurrentSection] = useState<Sections | ''>('');
    return (
        <CurrentSectionContext.Provider
            value={{ currentSection, setCurrentSection }}
        >
            {children}
        </CurrentSectionContext.Provider>
    );
};
