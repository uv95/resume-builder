import { contentCards } from '@/utils/data';
import React from 'react';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import style from './AddContent.module.scss';

type Props = {};

const AddContent = ({}: Props) => {
  return (
    <div className="grid p-2">
      {contentCards.map((card) => (
        <Card key={card.title} gray>
          <div className="p-2 pointer">
            <h3 className={style.heading}>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AddContent;
