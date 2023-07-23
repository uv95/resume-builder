import { ILanguage } from '@/utils/types/contentTypes';
import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

interface ILanguageContext {
  language: ILanguage | null;
  setLanguage: React.Dispatch<React.SetStateAction<ILanguage | null>>;

}

export const LanguageContext = createContext<ILanguageContext>({
    language: null,
    setLanguage: () => {},
});

export const LanguageProvider:FC<PropsWithChildren> = ({ children }) => {
    const [language, setLanguage] = useState<ILanguage | null>(null);
  
    const values = useMemo(
        ()=>({
            language,
            setLanguage,
        }),
        [language]
    )

    return (
        <LanguageContext.Provider value={values}>
            {children}
        </LanguageContext.Provider>
    );
};
