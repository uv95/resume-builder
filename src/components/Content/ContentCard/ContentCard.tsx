import { CurrentSectionContext } from '@/context/CurrentSectionContext';
import React, { useContext } from 'react';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import List from '../List/List';
import style from './ContentCard.module.scss';
import { Sections } from '@/utils/types/resumeTypes';
import { AdditionalContentItem, AdditionalContentSection } from '@/utils/types/contentTypes';
import ContentCardHeader from './ContentCardHeader';

type Props = {
  contentSection: AdditionalContentSection;
  sectionName: Sections;
  items: AdditionalContentItem[];
  icon: string;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
};

const ContentCard = ({
    contentSection,
    items,
    sectionName,
    icon,
    setContentToEdit,
}: Props) => {
    const { currentSection, setCurrentSection } = useContext(
        CurrentSectionContext
    );
    return (
        <Card>
            {
                <>
                    <ContentCardHeader icon={icon} contentSection={contentSection} setCurrentSection={setCurrentSection} currentSectionName={currentSection} sectionName={sectionName}/>

                    <div
                        className={style.content}
                        style={{
                            maxHeight:
                            sectionName === currentSection
                                ? 140 + items.length * 68 + 'px'
                                : '0',
                        }}
                    >
                        <List
                            setContentToEdit={setContentToEdit}
                            items={items}
                            section={sectionName}
                            currentSection={currentSection}
                            listId={`${sectionName}-list`}
                        />
                        <div className="p-2 centered">
                            <Button
                                onClick={() =>
                                    setContentToEdit((prev) => ({
                                        ...prev,
                                        section: sectionName,
                                    }))
                                }
                                btnType="thickBorder"
                            >
                                {'+ ' + contentSection.sectionName}
                            </Button>
                        </div>
                    </div>
                </>
            }
        </Card>
    );
};

export default ContentCard;
