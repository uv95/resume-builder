import MainPanel from '@/components/MainPanel/MainPanel';
import Navigation from '@/components/Navigation/Navigation';
import ResumePage from '@/components/ResumePage/ResumePage';
import React from 'react';
import style from '../../styles/Resume.module.scss';

type Props = {};

const Resume = (props: Props) => {
  return (
    <main>
      <div className={style.layout}>
        <div className="flex">
          <Navigation />
          <MainPanel />
        </div>
        <ResumePage />
      </div>
    </main>
  );
};

export default Resume;
