import { contentCards } from '@/utils/data';
import { Sections } from '@/utils/types/resumeTypes';
import React from 'react';
import Card from '../../Card/Card';
import style from './AddContent.module.scss';

type Props = {
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddContent = ({ setContentToEdit, setOpen }: Props) => {
  return (
    <div className="grid p-2">
      {contentCards.map((card) => (
        <Card key={card.title} gray hoverScale>
          <div
            className="p-2 pointer"
            onClick={() => {
              setContentToEdit((prev) => ({
                itemId: '',
                section: card.name as Sections,
              }));
              setOpen(false);
            }}
          >
            <h3 className={style.heading}>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AddContent;
