import { useContentContext } from '@/context/ContentContext';
import { useResumeContext } from '@/context/ResumeContext';
import { useColorsContext, useHeaderContext, useHeadingContext, useLayoutContext, useSpacingContext, useSubtitleContext } from '@/context/settings';
import { IResume } from '@/utils/types/resumeTypes';
import { ReactNode, useEffect, useState } from 'react';
    
interface ResumeDataSetterProps {
  resumeData: IResume;
  children:ReactNode
}
    
export const ResumeDataSetter = ({ resumeData, children }: ResumeDataSetterProps) => {
    const { setResume, setSettings } = useResumeContext();
    const { setContent } = useContentContext();
    const { setColors } = useColorsContext();
    const { setSpacing } = useSpacingContext();
    const { setLayout } = useLayoutContext();
    const { setSubtitle } = useSubtitleContext();
    const { setHeading } = useHeadingContext();
    const { setHeader } = useHeaderContext();

    const [hasEverythingLoaded, setHasEverythingLoaded] = useState(false)

    useEffect(() => {
        resumeData && setHasEverythingLoaded(true)
    }, [resumeData])

    useEffect(() => {
        if(resumeData.name && resumeData.id) setResume({name:resumeData.name, id:resumeData.id});
    }, [resumeData.name, resumeData.id, setResume]);

    useEffect(() => {
        if(resumeData.settings.spacing) setSpacing(resumeData.settings.spacing)
    }, [resumeData.settings.spacing, setSpacing]);

    useEffect(() => {
        if(resumeData.settings.layout) setLayout(resumeData.settings.layout)
    }, [resumeData.settings.layout, setLayout]);
    
    useEffect(() => {
        if(resumeData.settings) setSettings(resumeData.settings)
    }, [resumeData.settings, setSettings]);
  
    useEffect(() => {
        if(resumeData.content) setContent(resumeData.content)
    }, [resumeData.content, setContent]);

    useEffect(() => {
        if(resumeData.settings.colors) setColors(resumeData.settings.colors)
    }, [resumeData.settings.colors, setColors]);

    useEffect(() => {
        if(resumeData.settings.header) setHeader(resumeData.settings.header)
    }, [resumeData.settings.header, setHeader]);

    useEffect(() => {
        if(resumeData.settings.heading) setHeading(resumeData.settings.heading)
    }, [resumeData.settings.heading, setHeading]);

    useEffect(() => {
        if(resumeData.settings.subtitle) setSubtitle(resumeData.settings.subtitle)
    }, [resumeData.settings.subtitle, setSubtitle]);
    
    return (
        < >
            {hasEverythingLoaded && children}
        </>
    );
};