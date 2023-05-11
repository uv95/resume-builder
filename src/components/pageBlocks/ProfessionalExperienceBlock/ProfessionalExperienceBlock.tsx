import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';

type Props = {};

const ProfessionalExperienceBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.professionalExperience;

  return (
    <div className="p-2">
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.jobTitle}</p>
                <strong>{item.employer}</strong>
              </div>
              <div className="flex">
                <p>
                  {item.startDate} - {item.endDate}
                </p>
                <p>
                  {item.city}, {item.country}
                </p>
              </div>
            </div>
            <p className="longText">{item.description}</p>
          </div>
        ))}
    </div>
  );
};

export default ProfessionalExperienceBlock;
