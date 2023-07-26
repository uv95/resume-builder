import { IFont } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

interface IFontContext {
  font: IFont | null;
  setFont: React.Dispatch<React.SetStateAction<IFont | null>>;

}

export const FontContext = createContext<IFontContext>({
    font: null,
    setFont: () => {},
});

export const FontProvider:FC<PropsWithChildren> = ({ children }) => {
    const [font, setFont] = useState<IFont | null>(null);
  
    const values = useMemo(
        () => ({
            font,
            setFont,
        }),
        [font]
    )

    return (
        <FontContext.Provider value={values}>
            {children}
        </FontContext.Provider>
    );
};
