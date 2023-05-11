import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import style from './PersonalDetailsBlock.module.scss';

type Props = {};

const PersonalDetailsBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.personalDetails;
  const additionalInfo = content
    ? Object.values(content)[Object.values(content).length - 1]
    : [];

  return (
    <div className={style.container}>
      <div>{content?.fullName}</div>
      <div>{content?.jobTitle}</div>
      <div className="flex centered">
        {content?.email && <p> {content?.email}</p>}
        {content?.phone && <p> {content?.phone}</p>}
        {content?.address && <p> {content?.address}</p>}
        {...additionalInfo.map((item: any) => (
          <p key={item.name}>{item.input}</p>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetailsBlock;
