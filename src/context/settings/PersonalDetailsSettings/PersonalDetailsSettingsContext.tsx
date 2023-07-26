import { IHeader, IJobTitle, IName } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

interface IPersonalDetailsSettingsContext {
  personalDetailsSettings: {name:IName, header:IHeader, jobTitle:IJobTitle} | null;
  setPersonalDetailsSettings: React.Dispatch<React.SetStateAction<{name:IName, header:IHeader, jobTitle:IJobTitle} | null>>;
}

export const PersonalDetailsSettingsContext = createContext<IPersonalDetailsSettingsContext>({
    personalDetailsSettings: null,
    setPersonalDetailsSettings: () => {},
});

export const PersonalDetailsSettingsProvider:FC<PropsWithChildren> = ({ children }) => {
    const [personalDetailsSettings, setPersonalDetailsSettings] = useState<{name:IName, header:IHeader, jobTitle:IJobTitle} | null>(null);
  
    const values = useMemo(
        () => ({
            personalDetailsSettings,
            setPersonalDetailsSettings,
        }),
        [personalDetailsSettings]
    )

    return (
        <PersonalDetailsSettingsContext.Provider value={values}>
            {children}
        </PersonalDetailsSettingsContext.Provider>
    );
};
