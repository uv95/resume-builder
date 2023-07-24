import { ISpacing } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ISpacingContext {
  spacing: ISpacing | null;
  setSpacing: React.Dispatch<React.SetStateAction<ISpacing | null>>;
}

export const SpacingContext = createContext<ISpacingContext>({
    spacing: null,
    setSpacing: () => {},
});


export const SpacingProvider:FC<PropsWithChildren> = ({ children }) => {
    const [spacing, setSpacing] = useState<ISpacing | null>(null);


    const values = useMemo(
        ()=>({
            spacing,
            setSpacing
        }),
        [spacing]
    )

    return (
        <SpacingContext.Provider value={values}>
            {children}
        </SpacingContext.Provider>
    );
};

export const useSpacingContext = () => useContext(SpacingContext)
