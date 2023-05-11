import { IAdditionalInfo } from '@/utils/types';
import React, { createContext, useState } from 'react';

interface IAdditionalInfoContext {
  additionalInfo: IAdditionalInfo[];
  setAdditionalInfo: React.Dispatch<React.SetStateAction<IAdditionalInfo[]>>;
}

export const AdditionalInfoContext = createContext<IAdditionalInfoContext>({
  additionalInfo: [],
  setAdditionalInfo: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AdditionalInfoProvider = ({ children }: Props) => {
  const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfo[]>([]);
  return (
    <AdditionalInfoContext.Provider
      value={{ additionalInfo, setAdditionalInfo }}
    >
      {children}
    </AdditionalInfoContext.Provider>
  );
};
