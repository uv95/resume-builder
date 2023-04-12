import React from 'react';
import style from './Card.module.scss';

type Props = { children: React.ReactNode };

const Card = ({ children }: Props) => {
  return <div className={style.card}>{children}</div>;
};

export default Card;
