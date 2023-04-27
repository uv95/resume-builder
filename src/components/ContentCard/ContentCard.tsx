import useMaxHeight from '@/hooks/useMaxHeight';
import { IResume } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import List from '../List/List';
import style from './ContentCard.module.scss';

type Props = {
  inputData: any;
  resume: IResume;
  resumeData: any;
  active?: string;
  setActive?: React.Dispatch<React.SetStateAction<string>>;
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
  resume,
  contentToEdit,
  active,
  setActive,
  setContentToEdit,
}: Props) => {
  const [currentSection, setCurrentSection] = useState('');
  const { ref, maxHeight, changeMaxHeight } = useMaxHeight(active || '');

  return (
    <Card>
      {contentToEdit.section && contentToEdit.section === currentSection ? (
        <InputsSection
          itemId={contentToEdit.itemId}
          inputData={inputData}
          resume={resume}
          setContentToEdit={setContentToEdit}
        />
      ) : (
        <>
          <div className="flex spaceBetween p-2">
            <h3>{inputData.title}</h3>

            <p
              className="pointer"
              onClick={() => {
                setCurrentSection(inputData.name);

                changeMaxHeight();
                setActive &&
                  setActive(active === inputData.title ? '' : inputData.title);
              }}
            >
              v
            </p>
          </div>
          <div
            ref={ref}
            className={style.content}
            style={{
              maxHeight:
                active === ref.current?.previousSibling?.firstChild?.textContent
                  ? maxHeight + 'px'
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
