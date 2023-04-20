import React from 'react';
import style from './List.module.scss';

type Props = {
  setContentToEdit: () => void;
  list: any[];
};

const List = ({ setContentToEdit, list }: Props) => {
  return (
    <ul className={style.list}>
      {list.map((item) => (
        <div key={item}>
          <div className={style.devider}></div>
          <li className="p-2" onClick={setContentToEdit}>
            {item[Object.keys(item)[1]]}
          </li>
        </div>
      ))}

      <div className={style.devider}></div>
    </ul>
  );
};

export default List;
