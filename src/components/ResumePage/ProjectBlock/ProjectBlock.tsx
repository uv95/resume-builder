import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';

type Props = {};

const ProjectBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);

  const content = resume?.content.project;

  return (
    <div style={{ padding: '2%' }}>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween mb-1">
              <div className="flex">
                <p>{item.title}</p>
              </div>
              <div className="flex">
                <p>
                  {item.startDate.replaceAll('-', '/')}-
                  {item.endDate.replaceAll('-', '/')}
                </p>
              </div>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
};

export default ProjectBlock;
