import React from 'react';
import style from './Card.module.scss';

type Props = { children: React.ReactNode; gray?: boolean };

const Card = ({ children, gray }: Props) => {
  return (
    <div className={`${style.card} ${gray ? style.gray : ''}`}>{children}</div>
  );
};

export default Card;
