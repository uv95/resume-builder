import { Sections } from '@/utils/types/resumeTypes'
import style from './List.module.scss';
import parse from 'html-react-parser';

type Props = {section:Sections, item: any}

const ListItem = ({section, item}: Props) => {
    return <>
        {
            section===Sections.EDUCATION && <>
                <div className={style.primary}>
                    <b>{item.degree}</b>, <i>{item.school}</i>
                </div>
                <p className={style.secondary}>
                    {item.startDate.replaceAll('-', '/')} -{' '}
                    {item.endDate.replaceAll('-', '/')} | {item.city},{' '}
                    {item.country}
                </p>
            </>}
        {section===Sections.PROFESSIONAL_EXPERIENCE && (<>
            <div className={style.primary}>
                <b>{item.jobTitle}</b>, <i>{item.employer}</i>
            </div>
            <p className={style.secondary}>
                {item.startDate.replaceAll('-', '/')} -{' '}
                {item.endDate.replaceAll('-', '/')} | {item.city},{' '}
                {item.country}
            </p>
        </>)
        }
        {
            section===Sections.SKILLS && 
            (<div className="flex gap-1 aligned">
                <div className={style.primary}>
                    <b>{item.skill}</b>
                </div>
                <p className={style.secondary}>
                    {item.skillLevel}
                </p>
            </div>)
        }
        {
            section===Sections.PROJECT && (<>
                <div className={style.primary}>
                    <b>{item.title}</b>
                </div>
                <p className={style.secondary}>
                    {item.startDate.replaceAll('-', '/')} -{' '}
                    {item.endDate.replaceAll('-', '/')}
                </p>
            </>)
        }
        {
            section===Sections.PROFILE && <div className={style.primary}>{parse(item.text)}</div>
        }
        {
            section===Sections.LANGUAGE && <div className="flex gap-1 aligned">
                <div className={style.primary}>
                    <b>{item.language}</b>
                </div>
                <p className={style.secondary}>
                    {item.languageLevel}
                </p>
            </div>
        }
    </>


}

export default ListItem