import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import style from '../Page.module.scss';
import Icon from './Icon';

const PersonalDetailsBlock = () => {
  const { resume } = useContext(ResumeContext);

  const { position } = resume?.settings.layout!;
  const content = resume?.content.personalDetails;
  const { leftRightMargin, topBottomMargin, fontSize } =
    resume?.settings.spacing!;

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
        className={style.infoBlock}
        style={{
          color: setColor({
            colorOf: 'font',
            sectionPosition: position,
          }),
        }}
      >
        {content &&
          ['email', 'phone', 'address'].map(
            (item) =>
              content[item as keyof typeof content] && (
                <div key={item} className={style.info}>
                  <Icon
                    fill={
                      setColor({
                        section: 'headerIcons',
                        colorOf: 'font',
                        sectionPosition: position,
                      })!
                    }
                    size={fontSize}
                    dataName={item}
                  />
                  <p>
                    {
                      resume?.content?.personalDetails![
                        item as keyof typeof resume.content.personalDetails
                      ]
                    }
                  </p>
                </div>
              )
          )}

        {...additionalInfo.map((item: any) => (
          <div className={style.info} key={item.name}>
            <Icon
              fill={
                setColor({
                  section: 'headerIcons',
                  colorOf: 'font',
                  sectionPosition: position,
                })!
              }
              size={fontSize}
              dataName={item.name}
            />
            <p>{item.input}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetailsBlock;
