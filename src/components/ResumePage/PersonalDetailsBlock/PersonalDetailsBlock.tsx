import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import style from '../Page.module.scss';

type Props = {};

const PersonalDetailsBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);

  const { position } = resume?.settings.layout!;
  const content = resume?.content.personalDetails;
  const fontSize = resume?.settings.spacing.fontSize!;
  const leftRightMargin = resume?.settings.spacing.leftRightMargin!;
  const topBottomMargin = resume?.settings.spacing.topBottomMargin!;

  const additionalInfo = content
    ? Object.values(content)[Object.values(content).length - 1]
    : [];

  const { setColor } = useSetColor();

  const personalDetailsStyle = {
    background: setColor({
      colorOf: 'background',
      sectionPosition: position,
    }),
    color: setColor({
      section: 'name',
      colorOf: 'font',
      sectionPosition: position,
    }),
    paddingLeft: leftRightMargin + 'mm',
    paddingRight: leftRightMargin + 'mm',
    paddingTop: position === 'top' ? topBottomMargin + 'mm' : '0',
    paddingBottom: `calc(${topBottomMargin}mm - 1rem)`,
  };
  return (
    <div className={style.personalDetailsBlock} style={personalDetailsStyle}>
      <p style={{ fontSize: fontSize + 17 + 'px', fontWeight: 'bold' }}>
        {content?.fullName}
      </p>
      <p style={{ fontSize: fontSize + 8 + 'px' }}>{content?.jobTitle}</p>
      <div
        className={style.additionalInfo}
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
