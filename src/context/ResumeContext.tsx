import { IResume } from '@/utils/types/resumeTypes';
import React, { createContext, useState } from 'react';

interface IResumeContext {
  resume: IResume | null;
  setResume: React.Dispatch<React.SetStateAction<IResume | null>>;
}

export const ResumeContext = createContext<IResumeContext>({
    resume: null,
    setResume: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const ResumeProvider = ({ children }: Props) => {
    const [resume, setResume] = useState<IResume | null>(null);

    return (
        <ResumeContext.Provider value={{ resume, setResume }}>
            {children}
        </ResumeContext.Provider>
    );
};
