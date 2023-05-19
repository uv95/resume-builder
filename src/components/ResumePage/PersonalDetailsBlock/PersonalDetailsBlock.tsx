import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import style from '../ResumePage.module.scss';

type Props = {};

const PersonalDetailsBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const { position } = resume?.settings.layout!;
  const content = resume?.content.personalDetails;
  const additionalInfo = content
    ? Object.values(content)[Object.values(content).length - 1]
    : [];
  const { setColor } = useSetColor();

  return (
    <div
      className={style.personalDetailsBlock}
      style={{
        background: setColor({
          colorOf: 'background',
          sectionPosition: position,
        }),
        color: setColor({
          section: 'name',
          colorOf: 'font',
          sectionPosition: position,
        }),
      }}
    >
      <div>{content?.fullName}</div>
      <div>{content?.jobTitle}</div>
      <div
        className="flex flexWrap gap-1 centered"
        style={{
          color: setColor({
            colorOf: 'font',
            sectionPosition: position,
          }),
        }}
      >
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
