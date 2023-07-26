import { IHeader } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface IHeaderContext {
  header: IHeader | null;
  setHeader: React.Dispatch<React.SetStateAction<IHeader | null>>;
}

export const HeaderContext = createContext<IHeaderContext>({
    header: null,
    setHeader: () => {},
});


export const HeaderProvider:FC<PropsWithChildren> = ({ children }) => {
    const [header, setHeader] = useState<IHeader | null>(null);


    const values = useMemo(
        () => ({
            header,
            setHeader
        }),
        [header]
    )

    return (
        <HeaderContext.Provider value={values}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => useContext(HeaderContext)
