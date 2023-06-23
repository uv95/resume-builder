import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { Sections } from '@/utils/types/resumeTypes';
import Image from 'next/image';
import arrow from '../../../icons/arrowDown.svg';
import style from './ContentCard.module.scss';
import UpdateSectionName from './UpdateSectionName';

type Props = {
    setCurrentSection: React.Dispatch<React.SetStateAction<"" | Sections>>,
    currentSectionName: "" | Sections,
    sectionName: Sections,
    contentSection:AdditionalContentSection,
    icon: string;
}

const ContentCardHeader = ({ setCurrentSection,currentSectionName,contentSection,icon,sectionName}: Props) => {

    return (<div
        className="flex spaceBetween p-2 pointer"
        onClick={(e) =>{   
            const target = e.target as HTMLElement;
            target.id!=='sectionName' &&target.id!=='sectionNameBtn'&&
            setCurrentSection(
                currentSectionName === sectionName ? '' : sectionName
            )}
        }
    >
        <div className="flex gap-1 aligned">
            <Image src={icon} width="24" height="24" alt="icon" />
            {currentSectionName=== sectionName?  <UpdateSectionName sectionName={contentSection.sectionName} section={sectionName}/> 
                : <h3>{contentSection.sectionName}</h3>}
        </div>

        <div className="pointer">
            <Image
                className={style.icon}
                src={arrow}
                width="20"
                height="20"
                alt="arrow"
                style={{
                    transform: `rotate(${
                        sectionName === currentSectionName ? 180 : 0
                    }deg)`,
                }}
            />
        </div>
    </div> 
    )
}

export default ContentCardHeader