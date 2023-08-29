import { Providers } from '@/providers/Providers';
import { ResumeDataSetter } from '@/providers/ResumeDataSetter/ResumeDataSetter';
import { IResume } from '@/utils/types/resumeTypes';
import { useTranslation } from 'next-i18next';
import MyResumeItem from './MyResumeItem';
import style from './MyResumes.module.scss';

type Props = {myResumes:IResume[]}

const MyResumes = ({myResumes}: Props) => {
    const {t} = useTranslation()

    const resumesGrid = Array.apply(null, Array(4*Math.ceil((myResumes.length === 0 ? 4 : myResumes.length) / 4))).map((el, i) => myResumes[i]) 

    return (
        <div className={style.myResumes}>
            <h1>{t('my-resumes')}</h1>
            <div className={style.resumesGrid}>
                {resumesGrid.map((resume:IResume, i: number) => (
                    resume ? 
                        <Providers key={i}>
                            <ResumeDataSetter resumeData={resume}>
                                <MyResumeItem resume={resume}/>
                            </ResumeDataSetter> 
                        </Providers> :
                        <MyResumeItem key={i} resume={resume}/>
                ))}
            </div>
        </div>
      
    )
}

export default MyResumes