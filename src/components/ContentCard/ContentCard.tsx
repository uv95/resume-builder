import React, { useRef, useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import List from '../List/List';
import style from './ContentCard.module.scss';

type Props = { content: any };

const ContentCard = ({ content }: Props) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
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
      {isEdit || isAddNew ? (
        <InputsSection
          content={content}
          isEdit={isEdit}
          isAddNew={isAddNew}
          setIsEdit={setIsEdit}
          setIsAddNew={setIsAddNew}
        />
      ) : (
        <>
          <div className="flex spaceBetween p-2">
            <h3>{content.title}</h3>

            <p onClick={changeMaxHeight}>v</p>
          </div>
          <div
            ref={ref}
            className={style.content}
            style={{
              maxHeight: maxHeight + 'px',
            }}
          >
            <List setIsEdit={setIsEdit} />
            <div className="p-2 centered">
              <Button
                onClick={() => setIsAddNew(true)}
                color="whiteWithBorder"
                text={'+ ' + content.title}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ContentCard;
