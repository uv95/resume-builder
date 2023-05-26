import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext, useState } from 'react';
import style from './Page.module.scss';

type Props = { sectionPosition: 'left' | 'right' | undefined; title: string };

const Heading = ({ sectionPosition, title }: Props) => {
  const { setColor } = useSetColor();
  const { resume } = useContext(ResumeContext);
  const { style: headingStyle, size, uppercase } = resume?.settings.heading!;
  const { fontSize } = resume?.settings.spacing!;
  const [headingSize] = useState({
    s: fontSize + 1.5,
    m: fontSize + 3,
    l: fontSize + 4.5,
  });

  return (
    <>
      <div
        className={`${
          headingStyle === 'topBottomLine' ? style.headingTopBottomLine : ''
        } ${headingStyle === 'box' ? style.headingBox : ''}`}
        style={{
          color: setColor({
            section: 'headings',
            colorOf: 'font',
            sectionPosition,
          }),
          fontSize: headingSize[size] + 'px',
          fontWeight: 700,
          borderColor: setColor({
            section: 'headings',
            colorOf: 'font',
            sectionPosition,
          }),
          marginBottom: headingStyle !== 'line' ? '1rem' : 0,
        }}
      >
        {uppercase ? title.toUpperCase() : title}
        {headingStyle === 'box' && (
          <div
            className={style.headingBackground}
            style={{
              background:
                headingStyle === 'box'
                  ? setColor({
                      section: 'headings',
                      colorOf: 'font',
                      sectionPosition,
                    })
                  : 'inherit',
            }}
          ></div>
        )}
      </div>
      {headingStyle === 'line' && (
        <div
          className={``}
          style={{
            width: '100%',
            height: '0.2rem',
            background: setColor({
              section: 'headingsLine',
              colorOf: 'font',
              sectionPosition,
            }),
            marginTop: '-2px',
            marginBottom: '1rem',
          }}
        ></div>
      )}
    </>
  );
};

export default Heading;
