import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const ProjectBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.project;
  const { date } = resume?.settings!;

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.title}</p>
              </div>
              {item.startDate && (
                <Dates
                  format={date}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  sectionPosition={sectionPosition}
                />
              )}
            </div>
            <div>{parse(item.description)}</div>
          </div>
        ))}
    </>
  );
};

export default ProjectBlock;
