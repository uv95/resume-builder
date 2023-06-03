import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import style from '../Page.module.scss';
import Level from './Level';

type Props = { section: 'language' | 'skills' };

const SkillsLanguageBlock = ({ section }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content[section];
  const { format, textFormat, gridCols, infoItalic } =
    resume?.settings[section]!;

  const containerStyle = {
    gridTemplateColumns: `repeat(${
      format === 'grid'
        ? ['one', 'two', 'three', 'four'].indexOf(gridCols) + 1
        : 2
    }, 1fr)`,
  };

  const itemStyle = {
    display: format === 'grid' || format === 'level' ? 'block' : 'flex',
  };

  const getDivider = () => {
    if (textFormat === 'bullet') return '  ● ';
    if (textFormat === 'pipe') return '  | ';
    if (textFormat === 'wrap') return ',';
  };

  return (
    <>
      {content && (
        <div style={containerStyle} className={`${style[format + 'Format']}`}>
          {content.map((item, i) => (
            <div key={item.id}>
              <div className="flex spaceBetween">
                <div
                  style={itemStyle}
                  className={`${format === 'bubble' ? style.bubble : ''}`}
                >
                  <strong>
                    {section === 'language'
                      ? item[section as keyof typeof item]
                      : item[section.slice(0, -1) as keyof typeof item]}
                  </strong>
                  {item.info && (
                    <p
                      style={{
                        marginLeft:
                          format === 'text' || format === 'bubble'
                            ? '0.5rem'
                            : 0,
                        fontStyle: infoItalic ? 'italic' : 'normal',
                      }}
                    >
                      {format === 'grid' || format === 'level'
                        ? item.info
                        : `(${item.info})`}
                    </p>
                  )}
                  {format === 'text' &&
                    content.length - 1 !== i &&
                    getDivider()}
                </div>
                {format === 'level' &&
                  (section === 'language'
                    ? item[(section + 'Level') as keyof typeof item]
                    : item[
                        (section.slice(0, -1) + 'Level') as keyof typeof item
                      ]) && (
                    <Level
                      level={
                        section === 'language'
                          ? item[(section + 'Level') as keyof typeof item]!
                          : item[
                              (section.slice(0, -1) +
                                'Level') as keyof typeof item
                            ]!
                      }
                      section={section}
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SkillsLanguageBlock;
