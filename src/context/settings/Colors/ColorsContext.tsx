import { IColors } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface IColorsContext {
  colors: IColors | null;
  setColors: React.Dispatch<React.SetStateAction<IColors | null>>;

}

export const ColorsContext = createContext<IColorsContext>({
    colors: null,
    setColors: () => {},
});

export const ColorsProvider:FC<PropsWithChildren> = ({ children }) => {
    const [colors, setColors] = useState<IColors | null>(null);
  
    const values = useMemo(
        () => ({
            colors,
            setColors,
        }),
        [colors]
    )

    return (
        <ColorsContext.Provider value={values}>
            {children}
        </ColorsContext.Provider>
    );
};

export const useColorsContext = () => useContext(ColorsContext)

