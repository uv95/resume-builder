import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';
import style from '../Page.module.scss';
import { Position } from '@/utils/types/settingsTypes';

type Props = {
  sectionPosition?: Position.LEFT | Position.RIGHT;
};

const ProjectBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.project;
  const { columns } = resume?.settings.layout!;
  const { date } = resume?.settings!;

  const contentStyle = { display: columns === 1 ? 'grid' : 'block' };

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id} className={style.item}>
            <div className={style.content} style={contentStyle}>
              {item.startDate && columns === 1 && (
                <Dates
                  format={date}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  sectionPosition={sectionPosition}
                />
              )}
              <div>
                <b>{item.title}</b>
                {item.startDate && columns === 2 && (
                  <Dates
                    format={date}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    sectionPosition={sectionPosition}
                  />
                )}
                <div>{parse(item.description)}</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProjectBlock;
