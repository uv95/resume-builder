import React from 'react';
import Card from '../Card/Card';
import style from './MainPanel.module.scss';

type Props = {};

const MainPanel = (props: Props) => {
  return (
    <div className={style.mainPanel}>
      <div className="flex-column">
        <Card>cv name</Card>
        <Card>basic info</Card>
      </div>
    </div>
  );
};

export default MainPanel;
