import React from 'react';
import style from './Layout.module.scss';

type Props = {};

const Columns = (props: Props) => {
  return (
    <div>
      <h5 className="mb-1">Columns</h5>
      <div className="flex">
        <div className={style.columns}>
          <div className={style.columns_container__one}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={style.line}></div>
            ))}
          </div>
        </div>
        <div className={`${style.columns} ${style.columns_active}`}>
          <div className={style.columns_container__two}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={style.line}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Columns;
