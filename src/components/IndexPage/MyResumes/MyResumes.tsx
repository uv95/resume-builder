import { IResume } from '@/utils/types/resumeTypes';
import MyResumeItem from './MyResumeItem';
import style from './MyResumes.module.scss';
import { useTranslation } from 'next-i18next';
import { ResumeDataSetter } from '@/providers/ResumeDataSetter/ResumeDataSetter';
import { useEffect, useState } from 'react';

type Props = {myResumes:IResume[]}

const MyResumes = ({myResumes}: Props) => {
    const {t} = useTranslation()
    const [resumes, setResumes] = useState<IResume[]>([]);

    useEffect(() => {
        const resumesGrid = Array.apply(null, Array(4*Math.ceil((myResumes.length===0 ? 4 : myResumes.length) / 4))).map((el, i) => myResumes[i]) 
        setResumes(resumesGrid)
    }, [myResumes])

    return (
        <div className={style.myResumes}>
            <h1>{t('my-resumes')}</h1>
            <div className={style.resumesGrid}>
                {resumes.map((resume:IResume, i: number) => (
                    resume ? 
                        <ResumeDataSetter key={i} resumeData={resume}>
                            <MyResumeItem resume={resume}/>
                        </ResumeDataSetter> :
                        <MyResumeItem key={i} resume={resume}/>
                ))}
            </div>
        </div>
    )
}

export default MyResumes