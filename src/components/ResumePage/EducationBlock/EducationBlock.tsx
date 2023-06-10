import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';
import style from '../Page.module.scss';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const EducationBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.education;
  const { degreeFirst } = resume?.settings.education!;
  const { columns } = resume?.settings.layout!;
  const { style: subtitleStyle, position } = resume?.settings.subtitle!;
  const { date } = resume?.settings!;

  const subtitlePositionStyle = {
    display: position === 'sameLine' ? 'inline' : 'block',
  };
  const contentStyle = { display: columns === 1 ? 'grid' : 'block' };

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id} className={style.item}>
            <div className={style.content} style={contentStyle}>
              {columns === 1 && (
                <div>
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
              )}
              <div>
                <b style={subtitlePositionStyle}>
                  {degreeFirst ? item.degree : item.school}
                  {position === 'sameLine' && ', '}
                </b>

                <p
                  style={{
                    fontWeight: subtitleStyle === 'bold' ? 'bold' : 'normal',
                    fontStyle: subtitleStyle === 'italic' ? 'italic' : 'normal',
                    ...subtitlePositionStyle,
                  }}
                >
                  {degreeFirst ? item.school : item.degree}

                  {position === 'sameLine' && !degreeFirst && ', '}
                </p>
              </div>
            </div>
            {columns === 2 && (
              <div>
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
            )}
            <div>{parse(item.description)}</div>
          </div>
        ))}
    </>
  );
};

export default EducationBlock;
