import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import style from '../Page.module.scss';
import DetailsIcons from '../../DetailsIcons';

const PersonalDetailsBlock = () => {
  const { resume } = useContext(ResumeContext);

  const { position } = resume?.settings.layout!;
  const content = resume?.content.personalDetails;
  const { leftRightMargin, topBottomMargin, fontSize } =
    resume?.settings.spacing!;
  const {
    additionalInfoOrder,
    additionalInfoStyle,
    position: headerPosition,
  } = resume?.settings.header!;

  const additionalInfo = content
    ? Object.values(content)[Object.values(content).length - 1]
    : [];

  const { setColor } = useSetColor();

  const addBar = (condition: boolean) => {
    return (
      additionalInfoStyle === 'bar' &&
      ((headerPosition !== 'left' && position !== 'top') ||
        position === 'top') &&
      condition &&
      '  |'
    );
  };

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
  };

  return (
    <div style={personalDetailsStyle}>
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
          display:
            headerPosition === 'left' &&
            (position === 'left' || position === 'right')
              ? 'block'
              : 'flex',
          justifyContent: headerPosition === 'center' ? 'center' : 'flex-start',
        }}
      >
        {content &&
          ['email', 'phone', 'address'].map(
            (item) =>
              content[item as keyof typeof content] && (
                <div key={item} className={style.info}>
                  {additionalInfoStyle === 'icon' && (
                    <DetailsIcons
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
                  )}
                  <p>
                    {
                      resume?.content?.personalDetails![
                        item as keyof typeof resume.content.personalDetails
                      ]
                    }
                    {addBar(additionalInfo.length !== 0)}
                  </p>
                </div>
              )
          )}

        {...additionalInfo.map((item: any, i: number) => (
          <div className={style.info} key={item.name}>
            {additionalInfoStyle === 'icon' && (
              <DetailsIcons
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
            )}
            <p>
              {item.input} {addBar(i !== additionalInfo.length - 1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetailsBlock;
