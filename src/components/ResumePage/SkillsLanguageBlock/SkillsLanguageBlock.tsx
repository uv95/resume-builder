import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import {
    LanguageLevel,
    SkillLevel,
} from '@/utils/types/contentTypes';
import { Sections } from '@/utils/types/resumeTypes';
import {
    AccentColorSections,
    ColorOf,
    Format,
    Position,
    TextFormat,
} from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import style from '../Page.module.scss';
import Level from './Level';

type Props = {
  section: Sections.LANGUAGE | Sections.SKILLS;
  sectionPosition?: Position.LEFT | Position.RIGHT;
};

const SkillsLanguageBlock = ({ section, sectionPosition }: Props) => {
    const { resume } = useContext(ResumeContext);
    const content = {skills: resume?.content.skills.items||[], language: resume?.content.language.items||[]}

    const { format, textFormat, gridCols, infoItalic } =
    resume?.settings[section]!;
    const { applyAccentColor } = resume?.settings?.colors!;
    const { position, columns } = resume?.settings.layout!;
    const { setColor } = useSetColor();

    const containerStyle = {
        gridTemplateColumns: `repeat(${
            format === Format.GRID
                ? ['one', 'two', 'three', 'four'].indexOf(gridCols) + 1
                : 2
        }, 1fr)`,
        display:
      format === Format.LEVEL || format === Format.GRID
          ? columns === 2
              ? 'block'
              : Format.GRID
          : 'flex',
    };

    const itemStyle = {
        display:
      format === Format.GRID || format === Format.LEVEL ? 'block' : 'flex',
        background:
      format === Format.BUBBLE && applyAccentColor.dots
          ? setColor({
              section: AccentColorSections.DOTS,
              colorOf: ColorOf.FONT,
              sectionPosition,
          })
          : 'inherit',
        color:
      format === Format.BUBBLE && applyAccentColor.dots
          ? position !== Position.TOP && position === sectionPosition
              ? setColor({
                  colorOf: ColorOf.BG,
                  sectionPosition,
              })
              : '#ffffff'
          : 'inherit',
        border:
      format === Format.BUBBLE
          ? `1px solid ${setColor({
              section: AccentColorSections.DOTS,
              colorOf: ColorOf.FONT,
              sectionPosition,
          })}`
          : 0,
    };

    const getDivider = () => {
        if (textFormat === TextFormat.BULLET) return '  ● ';
        if (textFormat === TextFormat.PIPE) return '  | ';
        if (textFormat === TextFormat.WRAP) return ',';
    };

    return (
        <>
            {content[section as keyof typeof content].length!==0 && (
                <div style={containerStyle} className={`${style[format + 'Format']}`}>
                    {content[section as keyof typeof content].map((item, i) => (
                        <div
                            key={item.id}
                            style={{
                                marginBottom:
                  (format === Format.LEVEL || format === Format.GRID) &&
                  columns === 2
                      ? '1rem'
                      : 0,
                            }}
                        >
                            <div className="flex spaceBetween aligned">
                                <div
                                    style={itemStyle}
                                    className={`${format === Format.BUBBLE ? style.bubble : ''}`}
                                >
                                    <b>
                                        {section === Sections.LANGUAGE
                                            ? item['language' as keyof typeof item]
                                            : item['skill' as keyof typeof item]}
                                    </b>
                                    {item.info && (
                                        <p
                                            style={{
                                                marginLeft:
                          format === Format.TEXT || format === Format.BUBBLE
                              ? '0.5rem'
                              : 0,
                                                fontStyle: infoItalic ? 'italic' : 'normal',
                                            }}
                                        >
                                            {format === Format.GRID || format === Format.LEVEL
                                                ? item.info
                                                : `(${item.info})`}
                                        </p>
                                    )}
                                    {format === Format.TEXT &&
                    content[section as keyof typeof content].length - 1 !== i &&
                    getDivider()}
                                </div>
                                {format === Format.LEVEL &&
                  (section === Sections.LANGUAGE
                      ? item['languageLevel' as keyof typeof item]
                      : item['skillLevel' as keyof typeof item]) && (
                                    // eslint-disable-next-line react/jsx-indent
                                    <Level level={
                                        section === Sections.LANGUAGE
                                            ? (item[
                              'languageLevel' as keyof typeof item
                                            ] as LanguageLevel)
                                            : (item[
                              'skillLevel' as keyof typeof item
                                            ] as SkillLevel)
                                    }
                                    // eslint-disable-next-line react/jsx-indent-props
                                    section={section}
                                    // eslint-disable-next-line react/jsx-indent-props
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
