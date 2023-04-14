import { data } from '@/utils/data';
import React from 'react';
import Card from '../Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import style from './MainPanel.module.scss';

type Props = {};

const MainPanel = (props: Props) => {
  return (
    <div className={style.mainPanel}>
      <div className="flex-column">
        <Card>
          <div className="p-2">Resume name</div>
        </Card>
        {data.slice(1).map((contentEl) => (
          <ContentCard key={contentEl.name} content={contentEl} />
        ))}
      </div>
    </div>
  );
};

export default MainPanel;
