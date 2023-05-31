import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext, useState } from 'react';
import AdditionalInfoBlock from './AdditionalInfoBlock';

const PersonalDetailsBlock = () => {
  const { resume } = useContext(ResumeContext);

  const { position } = resume?.settings.layout!;
  const content = resume?.content.personalDetails;
  const { leftRightMargin, topBottomMargin, fontSize } =
    resume?.settings.spacing!;
  const { position: headerPosition } = resume?.settings.header!;
  const { size, style } = resume?.settings.jobTitle!;

  const [jobTitleSize] = useState({
    s: fontSize + 5,
    m: fontSize + 8,
    l: fontSize + 11,
  });

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
    textAlign: headerPosition,
    marginTop: 'auto',
  };

  return (
    <div style={personalDetailsStyle}>
      <p style={{ fontSize: fontSize + 17 + 'px', fontWeight: 'bold' }}>
        {content?.fullName}
      </p>
      <p
        style={{
          fontSize: jobTitleSize[size] + 'px',
          fontWeight: style === 'bold' ? 'bold' : 'normal',
          fontStyle: style === 'italic' ? 'italic' : 'normal',
        }}
      >
        {content?.jobTitle}
      </p>

      <AdditionalInfoBlock />
    </div>
  );
};

export default PersonalDetailsBlock;
