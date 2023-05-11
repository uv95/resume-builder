import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';

type Props = {};

const SkillsBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.skills;

  return (
    <div className="p-2">
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween">
              <div>
                <p>{item.skill}</p>
                <p>{item.info}</p>
              </div>
              <p>{item.skillLevel}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SkillsBlock;
