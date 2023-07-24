import { Sections } from '@/utils/types/resumeTypes'
import style from './List.module.scss';
import parse from 'html-react-parser';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {section:Sections, item: any}

const ListItem = ({section, item}: Props) => {
    const {t} = useTranslation()
    return <>
        { section === Sections.EDUCATION && <>
            <div className={style.primary}>
                <b>{item.degree}</b>, <i>{item.school}</i>
            </div>
            <p className={style.secondary}>
                {item.startDate.replaceAll('-', '/')}{item.startDate && ' - '}{item.endDate ? item.endDate.replaceAll('-', '/') : item.startDate && t('present')}{item.city && ` | ${item.city}`}{item.country&&item.city ? `, ${item.country}` : item.country&& ` | ${item.country}`}
            </p>
        </>
        }

        { section === Sections.PROFESSIONAL_EXPERIENCE && (<>
            <div className={style.primary}>
                <b>{item.jobTitle}</b>, <i>{item.employer}</i>
            </div>
            <p className={style.secondary}>
                {item.startDate.replaceAll('-', '/')}{item.startDate && ' - '}{item.endDate ? item.endDate.replaceAll('-', '/') : item.startDate && t('present')}{item.city && ` | ${item.city}`}{item.country&&item.city ? `, ${item.country}` : item.country && ` | ${item.country}`}
            </p>
        </>)
        }

        { section === Sections.SKILLS && 
            (<div className="flex gap-1 aligned">
                <div className={style.primary}>
                    <b>{item.skill}</b>
                </div>
                <p className={style.secondary}>
                    {item.skillLevel}
                </p>
            </div>)
        }

        { section === Sections.PROJECT && (
            <>
                <div className={style.primary}>
                    <b>{item.title}</b>
                </div>
                <p className={style.secondary}>
                    {item.startDate.replaceAll('-', '/')}{item.startDate && ' - '}{item.endDate ? item.endDate.replaceAll('-', '/') : item.startDate && t('present')}
                </p>
            </>)
        }

        { section === Sections.PROFILE && <div className={style.primary}>{parse(item.text)}</div>
        }
        
        { section === Sections.LANGUAGE && <div className="flex gap-1 aligned">
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

export default memo(ListItem)