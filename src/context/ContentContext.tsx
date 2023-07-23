import { IContent } from '@/utils/types/resumeTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface IContentContext {
  content: IContent | null;
  setContent: React.Dispatch<React.SetStateAction<IContent | null>>;

}

export const ContentContext = createContext<IContentContext>({
    content: null,
    setContent: () => {},

});

export const ContentProvider:FC<PropsWithChildren> = ({ children }) => {
    const [content, setContent] = useState<IContent | null>(null);
  
    const values = useMemo(
        ()=>({
            content,
            setContent,
        }),
        [content]
    )

    return (
        <ContentContext.Provider value={values}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContentContext = () => useContext(ContentContext)