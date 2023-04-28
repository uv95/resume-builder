import React, { createContext, useState } from 'react';

interface ICurrentSectionContext {
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrentSectionContext = createContext<ICurrentSectionContext>({
  currentSection: '',
  setCurrentSection: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const CurrentSectionProvider = ({ children }: Props) => {
  const [currentSection, setCurrentSection] = useState('');
  return (
    <CurrentSectionContext.Provider
      value={{ currentSection, setCurrentSection }}
    >
      {children}
    </CurrentSectionContext.Provider>
  );
};
