import React from 'react';
import style from './List.module.scss';

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const List = ({ setIsEdit }: Props) => {
  return (
    <ul className={style.list}>
      <div className={style.devider}></div>
      <li className="p-2" onClick={() => setIsEdit(true)}>
        First skill
      </li>
      <div className={style.devider}></div>
      <li className="p-2" onClick={() => setIsEdit(true)}>
        Second skill
      </li>
      <div className={style.devider}></div>
    </ul>
  );
};

export default List;
