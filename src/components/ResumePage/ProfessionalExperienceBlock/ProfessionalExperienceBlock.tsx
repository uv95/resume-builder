import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const ProfessionalExperienceBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const { style: subtitleStyle, position } = resume?.settings.subtitle!;
  const { date } = resume?.settings!;
  const { jobTitleFirst } = resume?.settings.professionalExperience!;
  const content = resume?.content.professionalExperience;

  const positionStyle = {
    display: position === 'sameLine' ? 'inline' : 'block',
  };

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div>
                {jobTitleFirst && (
                  <p style={positionStyle}>
                    {item.jobTitle}
                    {position === 'sameLine' && ', '}
                  </p>
                )}
                <p
                  style={{
                    fontWeight:
                      jobTitleFirst && subtitleStyle === 'bold'
                        ? 'bold'
                        : 'normal',
                    fontStyle:
                      jobTitleFirst && subtitleStyle === 'italic'
                        ? 'italic'
                        : 'normal',
                    ...positionStyle,
                  }}
                >
                  {item.employer}
                  {position === 'sameLine' && !jobTitleFirst && ', '}
                </p>
                {!jobTitleFirst && (
                  <p
                    style={{
                      fontWeight:
                        !jobTitleFirst && subtitleStyle === 'bold'
                          ? 'bold'
                          : 'normal',
                      fontStyle:
                        !jobTitleFirst && subtitleStyle === 'italic'
                          ? 'italic'
                          : 'normal',
                      ...positionStyle,
                    }}
                  >
                    {item.jobTitle}
                  </p>
                )}
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

export default ProfessionalExperienceBlock;
