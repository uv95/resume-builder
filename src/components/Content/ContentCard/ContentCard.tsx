import { CurrentSectionContext } from '@/context/CurrentSectionContext';
import Image from 'next/image';
import React, { useContext } from 'react';
import Button from '../../Button/Button';
import Card from '../../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import List from '../List/List';
import arrow from '../../../icons/arrowDown.svg';
import style from './ContentCard.module.scss';
import { Sections } from '@/utils/types/resumeTypes';
import { AdditionalContentItem } from '@/utils/types/contentTypes';

type Props = {
  inputData: any;
  items: AdditionalContentItem[];
  contentToEdit: {
    section: Sections | '';
    itemId: string;
  };
  icon: string;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
};

const ContentCard = ({
    inputData,
    items,
    contentToEdit,
    icon,
    setContentToEdit,
}: Props) => {
    const { currentSection, setCurrentSection } = useContext(
        CurrentSectionContext
    );
    return (
        <Card>
            {contentToEdit.section && contentToEdit.section === currentSection ? (
                <InputsSection
                    itemId={contentToEdit.itemId}
                    inputData={inputData}
                    setContentToEdit={setContentToEdit}
                />
            ) : (
                <>
                    <div
                        className="flex spaceBetween p-2 pointer"
                        onClick={() =>
                            setCurrentSection(
                                currentSection === inputData.name ? '' : inputData.name
                            )
                        }
                    >
                        <div className="flex gap-1 aligned">
                            <Image src={icon} width="24" height="24" alt="icon" />
                            <h3>{inputData.title}</h3>
                        </div>

                        <p className="pointer">
                            <Image
                                className={style.icon}
                                src={arrow}
                                width="20"
                                height="20"
                                alt="arrow"
                                style={{
                                    transform: `rotate(${
                                        inputData.name === currentSection ? 180 : 0
                                    }deg)`,
                                }}
                            />
                        </p>
                    </div>

                    <div
                        className={style.content}
                        style={{
                            maxHeight:
                inputData.name === currentSection
                    ? 140 + items.length * 68 + 'px'
                    : '0',
                        }}
                    >
                        <List
                            setContentToEdit={setContentToEdit}
                            items={items}
                            section={inputData.name}
                            currentSection={currentSection}
                            listId={`${inputData.name}-list`}
                        />
                        <div className="p-2 centered">
                            <Button
                                onClick={() =>
                                    setContentToEdit((prev) => ({
                                        ...prev,
                                        section: inputData.name,
                                    }))
                                }
                                btnType="thickBorder"
                            >
                                {'+ ' + inputData.title}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
};

export default ContentCard;
