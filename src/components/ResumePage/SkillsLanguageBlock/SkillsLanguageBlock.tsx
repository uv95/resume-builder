import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import React, { useContext } from 'react';
import style from '../Page.module.scss';
import Level from './Level';

type Props = {
  section: 'language' | 'skills';
  sectionPosition?: 'left' | 'right';
};

const SkillsLanguageBlock = ({ section, sectionPosition }: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content[section];

  const { format, textFormat, gridCols, infoItalic } =
    resume?.settings[section]!;
  const { applyAccentColor } = resume?.settings?.colors!;
  const { position, columns } = resume?.settings.layout!;
  const { setColor } = useSetColor();

  const containerStyle = {
    gridTemplateColumns: `repeat(${
      format === 'grid'
        ? ['one', 'two', 'three', 'four'].indexOf(gridCols) + 1
        : 2
    }, 1fr)`,
    display:
      format === 'level' || format === 'grid'
        ? columns === 2
          ? 'block'
          : 'grid'
        : 'flex',
  };

  const itemStyle = {
    display: format === 'grid' || format === 'level' ? 'block' : 'flex',
    background:
      format === 'bubble' && applyAccentColor.dots
        ? setColor({
            section: 'dots',
            colorOf: 'font',
            sectionPosition,
          })
        : 'inherit',
    color:
      format === 'bubble' && applyAccentColor.dots
        ? position !== 'top' && position === sectionPosition
          ? setColor({
              colorOf: 'background',
              sectionPosition,
            })
          : '#ffffff'
        : 'inherit',
    border:
      format === 'bubble'
        ? `1px solid ${setColor({
            section: 'dots',
            colorOf: 'font',
            sectionPosition,
          })}`
        : 0,
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
          {content
            // .sort((a, b) => a.index - b.index)
            .map((item, i) => (
              <div
                key={item.id}
                style={{
                  marginBottom:
                    (format === 'level' || format === 'grid') && columns === 2
                      ? '1rem'
                      : 0,
                }}
              >
                <div className="flex spaceBetween aligned">
                  <div
                    style={itemStyle}
                    className={`${format === 'bubble' ? style.bubble : ''}`}
                  >
                    <b>
                      {section === 'language'
                        ? item[section as keyof typeof item]
                        : item[section.slice(0, -1) as keyof typeof item]}
                    </b>
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
                            ? (item[
                                (section + 'Level') as keyof typeof item
                              ]! as string)
                            : (item[
                                (section.slice(0, -1) +
                                  'Level') as keyof typeof item
                              ]! as string)
                        }
                        section={section}
                        sectionPosition={sectionPosition}
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
