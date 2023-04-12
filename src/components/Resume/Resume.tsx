import React from 'react';
import style from './Resume.module.scss';

type Props = {};

const Resume = (props: Props) => {
  return (
    <div className={style.resume}>
      <div className={style.page}>Resume</div>
    </div>
  );
};

export default Resume;
