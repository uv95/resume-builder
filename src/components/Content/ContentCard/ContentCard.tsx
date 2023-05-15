import { CurrentSectionContext } from '@/context/CurrentSectionContext';
import React, { useContext } from 'react';
import Button from '../../Button/Button';
import Card from '../../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import List from '../List/List';
import style from './ContentCard.module.scss';

type Props = {
  inputData: any;
  resumeData: any;
  contentToEdit: {
    section: string;
    itemId: string;
  };

  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: string;
      itemId: string;
    }>
  >;
};

const ContentCard = ({
  inputData,
  resumeData,
  contentToEdit,
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
          <div className="flex spaceBetween p-2">
            <h3>{inputData.title}</h3>

            <p
              className="pointer"
              onClick={() =>
                setCurrentSection(
                  currentSection === inputData.name ? '' : inputData.name
                )
              }
            >
              v
            </p>
          </div>

          <div
            className={style.content}
            style={{
              maxHeight:
                inputData.name === currentSection
                  ? 140 + resumeData.length * 68 + 'px'
                  : '0',
            }}
          >
            <List
              setContentToEdit={setContentToEdit}
              list={resumeData}
              section={currentSection}
            />
            <div className="p-2 centered">
              <Button
                onClick={() =>
                  setContentToEdit((prev) => ({
                    ...prev,
                    section: inputData.name,
                  }))
                }
                color="whiteWithBorder"
                text={'+ ' + inputData.title}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ContentCard;
