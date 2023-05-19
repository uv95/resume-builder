import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';

type Props = {
  sectionPosition?: 'left' | 'right';
};

const ProfessionalExperienceBlock = ({ sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.professionalExperience;

  return (
    <>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.jobTitle}</p>
                <strong>{item.employer}</strong>
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

export default ProfessionalExperienceBlock;
