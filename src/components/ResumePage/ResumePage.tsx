import { IResume } from '@/utils/types';
import React from 'react';
import PersonalDetailsBlock from '../pageBlocks/PersonalDetailsBlock/PersonalDetailsBlock';
import style from './ResumePage.module.scss';

type Props = { resume: IResume };

const ResumePage = ({ resume }: Props) => {
  return (
    <div className={style.resume}>
      <div className={style.page}>
        <PersonalDetailsBlock />
        {}
      </div>
    </div>
  );
};

export default ResumePage;
