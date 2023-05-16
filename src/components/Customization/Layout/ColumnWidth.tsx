import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import style from './Layout.module.scss';

type Props = {};

const ColumnWidth = (props: Props) => {
  const { resume } = useContext(ResumeContext);

  return (
    <div>
      <h5>Column width</h5>
      <div className={style.columnWidth}>
        <div className={style.columnWidth_options}>
          <p>Left</p>
          <div className={style.columnWidth_options_box}>+</div>
        </div>
        <div className={style.columnWidth_options}>
          <p>Right</p>
          <div className={style.columnWidth_options_box}>+</div>
        </div>
      </div>
    </div>
  );
};

export default ColumnWidth;
