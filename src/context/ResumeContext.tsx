import { IContent, ISettings } from '@/utils/types/resumeTypes';
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface IResumeContext {
  resume: {id:string, name:string};
  setResume: React.Dispatch<React.SetStateAction<{id:string, name:string}>>;
  settings: ISettings | null;
  setSettings: React.Dispatch<React.SetStateAction<ISettings | null>>;
}

export const ResumeContext = createContext<IResumeContext>({
    resume: {id:'', name:''},
    setResume: () => {},
    settings: null,
    setSettings: () => {},
});


export const ResumeProvider:FC<PropsWithChildren> = ({ children }) => {
    const [resume, setResume] = useState({id:'', name:''});
    const [settings, setSettings] = useState<ISettings | null>(null);

    const resumeValues = useMemo(
        () => ({
            resume,
            setResume,
        }),
        [resume]
    )
    const settingsValues = useMemo(
        () => ({
            settings,
            setSettings,
        }),
        [settings]
    )


    return (
        <ResumeContext.Provider value={{...resumeValues, ...settingsValues }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => useContext(ResumeContext)

