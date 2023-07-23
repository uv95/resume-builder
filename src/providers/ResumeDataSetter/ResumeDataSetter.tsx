import { useColorsContext } from '@/context/ColorsContext';
import { useContentContext } from '@/context/ContentContext';
import { useResumeContext } from '@/context/ResumeContext';
import { useSpacingContext } from '@/context/SpacingContext';
import { IResume } from '@/utils/types/resumeTypes';
import { ReactNode, useEffect } from 'react';
    
interface ResumeDataSetterProps {
  resumeData: IResume;
  children:ReactNode
}
    
export const ResumeDataSetter = ({ resumeData,children }: ResumeDataSetterProps) => {
    const { setResume,setSettings } = useResumeContext();
    const { setContent } = useContentContext();
    const { setColors } = useColorsContext();
    const { setSpacing } =useSpacingContext();

    useEffect(() => {
        if(resumeData.name && resumeData.id) {
            setResume({name:resumeData.name,id:resumeData.id});
        };
    }, [resumeData.name, resumeData.id, setResume]);

    useEffect(() => {
        if(resumeData.settings.spacing) {
            setSpacing(resumeData.settings.spacing)
        };
    }, [resumeData.settings.spacing, setSpacing]);
    
    useEffect(() => {
        if(resumeData.settings) {
            setSettings(resumeData.settings)
        };
    }, [resumeData.settings, setSettings]);
  
    useEffect(() => {
        if(resumeData.content) {
            setContent(resumeData.content)
        };
    }, [resumeData.content,setContent]);

    useEffect(() => {
        if(resumeData.settings.colors) {
            setColors(resumeData.settings.colors)
        };
    }, [resumeData.settings.colors,setColors]);
    
    return (
        < >
            {children}
        </>
    );
};