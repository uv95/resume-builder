import React from 'react';
import style from './Tag.module.scss';

type Props = { text: string; onClick: () => void };

const Tag = ({ text, onClick }: Props) => {
  return (
    <div className={style.tag} onClick={onClick}>
      <b>+</b>
      <p>{text}</p>
    </div>
  );
};

export default Tag;
