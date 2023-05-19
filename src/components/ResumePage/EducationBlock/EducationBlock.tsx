import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import Dates from '../Dates';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const EducationBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.education;
  const { setColor } = useSetColor();

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.degree}</p>
                <strong>{item.school}</strong>
              </div>
              <div className="flex">
                <Dates
                  startDate={item.startDate.replaceAll('-', '/')}
                  endDate={item.endDate.replaceAll('-', '/')}
                  sectionPosition={sectionPosition}
                />
                <p>
                  {item.city}, {item.country}
                </p>
              </div>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
    </>
  );
};

export default EducationBlock;
