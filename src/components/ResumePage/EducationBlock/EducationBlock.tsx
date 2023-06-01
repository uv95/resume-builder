import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const EducationBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.education;
  const { style: subtitleStyle, position } = resume?.settings.subtitle!;
  const { date } = resume?.settings!;
  const { setColor } = useSetColor();

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className={`${position === 'sameLine' ? 'flex gap-1' : ''}`}>
                <p>
                  {item.degree}
                  {position === 'sameLine' && ','}
                </p>
                <p
                  style={{
                    fontWeight: subtitleStyle === 'bold' ? 'bold' : 'normal',
                    fontStyle: subtitleStyle === 'italic' ? 'italic' : 'normal',
                  }}
                >
                  {item.school}
                </p>
              </div>
              <div className="flex">
                {item.startDate && (
                  <Dates
                    format={date}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    sectionPosition={sectionPosition}
                  />
                )}
                <p>
                  {item.city}, {item.country}
                </p>
              </div>
            </div>
            <div>{parse(item.description)}</div>
          </div>
        ))}
    </>
  );
};

export default EducationBlock;
