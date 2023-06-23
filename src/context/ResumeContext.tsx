import { IContent, IResume, ISettings } from '@/utils/types/resumeTypes';
import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';

interface IResumeContext {
  resume: IResume | null;
  setResume: React.Dispatch<React.SetStateAction<IResume | null>>;
  content: IContent | null;
  setContent: React.Dispatch<React.SetStateAction<IContent | null>>;
  settings: ISettings | null;
  setSettings: React.Dispatch<React.SetStateAction<ISettings | null>>;
}

export const ResumeContext = createContext<IResumeContext>({
    resume: null,
    setResume: () => {},
    content: null,
    setContent: () => {},
    settings: null,
    setSettings: () => {},
});


export const ResumeProvider:FC<PropsWithChildren> = ({ children }) => {
    const [resume, setResume] = useState<IResume | null>(null);
    const [content, setContent] = useState<IContent | null>(null);
    const [settings, setSettings] = useState<ISettings | null>(null);

    const values = useMemo(
        ()=>({
            resume,
            setResume,
            content,
            setContent,
            settings,
            setSettings
        }),
        [resume,content,settings]
    )

    return (
        <ResumeContext.Provider value={values}>
            {children}
        </ResumeContext.Provider>
    );
};
