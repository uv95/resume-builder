import { IResume } from '@/utils/types/resumeTypes';
import MyResumeItem from './MyResumeItem';
import style from './MyResumes.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {myResumes:IResume[]}

const MyResumes = ({myResumes}: Props) => {
    const {t} = useTranslation()
    const resumesGrid = Array.apply(null,Array(4*Math.ceil((myResumes.length===0 ? 4 : myResumes.length) / 4))).map((el,i)=>myResumes[i])
    console.log('myResumes: ', myResumes, 'grid: ', resumesGrid)
    return (
        <div className={style.myResumes}>
            <h1>{t('my-resumes')}</h1>
            <div className={style.resumesGrid}>
                {resumesGrid.map((resume:IResume, i:number)=>(
                    <MyResumeItem key={i} resume={resume}/>
                ))}
            </div>
        </div>
    )
}

export default MyResumes