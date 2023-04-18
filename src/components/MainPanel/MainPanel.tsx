import { data } from '@/utils/data';
import { IResume } from '@/utils/types';
import React from 'react';
import Card from '../Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import style from './MainPanel.module.scss';

type Props = { content: IResume };

const MainPanel = ({ content }: Props) => {
  return (
    <div className={style.mainPanel}>
      <div className="flex-column">
        <Card>
          <div className="p-2">{content.name}</div>
        </Card>
        <PersonalDetails content={content.personalDetails} />
        {data.slice(1).map((contentEl) => (
          <ContentCard key={contentEl.name} content={contentEl} />
        ))}
      </div>
    </div>
  );
};

export default MainPanel;
