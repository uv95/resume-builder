import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const ProjectBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.project;

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.title}</p>
              </div>
              <Dates
                startDate={item.startDate.replaceAll('-', '/')}
                endDate={item.endDate.replaceAll('-', '/')}
                sectionPosition={sectionPosition}
              />
            </div>
            <p>{item.description}</p>
          </div>
        ))}
    </>
  );
};

export default ProjectBlock;
