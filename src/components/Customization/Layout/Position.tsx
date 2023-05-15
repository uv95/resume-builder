import style from './Layout.module.scss';
import React from 'react';

type Props = {};

const Position = (props: Props) => {
  return (
    <div className="flex">
      <div className={style.position}>
        <div className={`test ${style.figure} ${style.top}`}></div>
        <p>Top</p>
      </div>
      <div className={style.position}>
        <div className={`test ${style.figure} ${style.left}`}></div>
        <p>Left</p>
      </div>
      <div className={style.position}>
        <div className={`test ${style.figure} ${style.right}`}></div>
        <p>Right</p>
      </div>
    </div>
  );
};

export default Position;
