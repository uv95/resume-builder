import { ILayout } from '@/utils/types/settingsTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ILayoutContext {
  layout: ILayout | null;
  setLayout: React.Dispatch<React.SetStateAction<ILayout | null>>;
}

export const LayoutContext = createContext<ILayoutContext>({
    layout: null,
    setLayout: () => {},
});

export const LayoutProvider:FC<PropsWithChildren> = ({ children }) => {
    const [layout, setLayout] = useState<ILayout | null>(null);
  
    const values = useMemo(
        ()=>({
            layout,
            setLayout,
        }),
        [layout]
    )

    return (
        <LayoutContext.Provider value={values}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = () => useContext(LayoutContext)

