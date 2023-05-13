import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';

type Props = {};

const EducationBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.education;

  return (
    <div style={{ padding: '2%' }}>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.degree}</p>
                <strong>{item.school}</strong>
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
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
};

export default EducationBlock;
