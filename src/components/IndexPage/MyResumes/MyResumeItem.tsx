import PageContent from '@/components/ResumePage/Page/PageContent';
import { IResume } from '@/utils/types/resumeTypes'
import { useRouter } from 'next/router';
import { useState } from 'react';
import style from './MyResumes.module.scss';
import { useTranslation } from 'next-i18next';
import { ResumeDataSetter } from '@/providers/ResumeDataSetter/ResumeDataSetter';


type Props = {resume:IResume | undefined}

const MyResumeItem = ({resume}: Props) => {
    const {t} = useTranslation()
    const [isHovered, setIsHovered]=useState(false)
    const router = useRouter();

    return (
        <div className={style.resume}>
            <div onMouseEnter={() => resume && setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={style.pageWrapper}>

                {resume &&
                <>
                    <PageContent 
                        content={resume.content} 
                        settings={resume.settings} 
                        id={style.pageContentIndexPage}/>
               
                    <div 
                        onClick={() => router.push(`/resume/${resume.id}`)} 
                        className={`${style.viewResume} ${isHovered? style.viewResume_hovered : '' }`}>
                        <p className={`${style.viewResumeText} ${isHovered? style.viewResumeText_hovered : '' }`}>{(t('view-resume')).toUpperCase()}</p>
                    </div>
                </>
                }
            </div>
            {resume && <div className={style.resumeName}>{resume.name}</div>}
        </div>
    )
}

export default MyResumeItem