import { IAdditionalInfo } from '@/utils/types/contentTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface IAdditionalInfoContext {
  additionalInfo: IAdditionalInfo[];
  setAdditionalInfo: React.Dispatch<React.SetStateAction<IAdditionalInfo[]>>;
}

export const AdditionalInfoContext = createContext<IAdditionalInfoContext>({
    additionalInfo: [],
    setAdditionalInfo: () => {},
});

export const AdditionalInfoProvider:FC<PropsWithChildren> = ({ children }) => {
    const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfo[]>([]);

    const values = useMemo(
        () => ({
            additionalInfo,
            setAdditionalInfo
        }),
        [additionalInfo]
    )

    return (
        <AdditionalInfoContext.Provider
            value={values}
        >
            {children}
        </AdditionalInfoContext.Provider>
    );
};

export const useAdditionalInfoContext = () => useContext(AdditionalInfoContext)
