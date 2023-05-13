import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';

type Props = {};

const LanguageBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.language;

  return (
    <div style={{ padding: '2%' }}>
      {content &&
        content.map((item) => (
          <div key={item.id}>
            <div className="flex spaceBetween">
              <div>
                <p>{item.language}</p>
                <p>{item.info}</p>
              </div>
              <p>{item.languageLevel}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LanguageBlock;
