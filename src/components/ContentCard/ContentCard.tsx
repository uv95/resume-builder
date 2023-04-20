import React, { useRef, useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import List from '../List/List';
import style from './ContentCard.module.scss';

type Props = {
  inputData: any;
  resumeData: any;
  contentToEdit?: string;
  setContentToEdit: React.Dispatch<React.SetStateAction<string | null>>;
};

const ContentCard = ({
  inputData,
  resumeData,
  contentToEdit,
  setContentToEdit,
}: Props) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isAddNew, setIsAddNew] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const changeMaxHeight = () => {
    if (ref.current)
      return maxHeight
        ? setMaxHeight(0)
        : setMaxHeight(ref.current.scrollHeight);

    return;
  };

  return (
    <Card>
      {isAddNew || contentToEdit ? (
        <InputsSection
          content={inputData}
          isAddNew={isAddNew}
          setIsAddNew={setIsAddNew}
          setContentToEdit={setContentToEdit}
        />
      ) : (
        <>
          <div className="flex spaceBetween p-2">
            <h3>{inputData.title}</h3>

            <p onClick={changeMaxHeight}>v</p>
          </div>
          <div
            ref={ref}
            className={style.content}
            style={{
              maxHeight: maxHeight + 'px',
            }}
          >
            <List
              setContentToEdit={() => setContentToEdit(inputData.name)}
              list={resumeData}
            />
            <div className="p-2 centered">
              <Button
                onClick={() => setIsAddNew(true)}
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
