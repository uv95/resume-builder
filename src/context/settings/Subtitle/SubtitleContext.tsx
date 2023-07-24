import { ISubtitle } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ISubtitleContext {
  subtitle: ISubtitle | null;
  setSubtitle: React.Dispatch<React.SetStateAction<ISubtitle | null>>;
}

export const SubtitleContext = createContext<ISubtitleContext>({
    subtitle: null,
    setSubtitle: () => {},
});


export const SubtitleProvider:FC<PropsWithChildren> = ({ children }) => {
    const [subtitle, setSubtitle] = useState<ISubtitle | null>(null);


    const values = useMemo(
        ()=>({
            subtitle,
            setSubtitle
        }),
        [subtitle]
    )

    return (
        <SubtitleContext.Provider value={values}>
            {children}
        </SubtitleContext.Provider>
    );
};

export const useSubtitleContext = () => useContext(SubtitleContext)
