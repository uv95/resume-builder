import { IHeading } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface IHeadingContext {
  heading: IHeading | null;
  setHeading: React.Dispatch<React.SetStateAction<IHeading | null>>;

}

export const HeadingContext = createContext<IHeadingContext>({
    heading: null,
    setHeading: () => {},
});

export const HeadingProvider:FC<PropsWithChildren> = ({ children }) => {
    const [heading, setHeading] = useState<IHeading | null>(null);
  
    const values = useMemo(
        ()=>({
            heading,
            setHeading,
        }),
        [heading]
    )

    return (
        <HeadingContext.Provider value={values}>
            {children}
        </HeadingContext.Provider>
    );
};

export const useHeadingContext = () => useContext(HeadingContext)
