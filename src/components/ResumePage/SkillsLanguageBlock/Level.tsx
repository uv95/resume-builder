import useSetColor from '@/hooks/useSetColor';
import { LanguageLevel, SkillLevel } from '@/utils/types/contentTypes';
import { ISettings, Sections } from '@/utils/types/resumeTypes';
import {
    AccentColorSections,
    ColorOf,
    Position,
} from '@/utils/types/settingsTypes';
import React, { memo } from 'react';
import style from './SkillsLanguageBlock.module.scss';

type Props = {
  section: Sections.LANGUAGE | Sections.SKILLS;
  level: LanguageLevel | SkillLevel;
  sectionPosition?: Position.LEFT | Position.RIGHT;
};

const Level = ({ section, level, sectionPosition }: Props) => {
    const { setColor } = useSetColor();

    const levels =
    section === Sections.LANGUAGE
        ? Object.values(LanguageLevel).filter((level) => level !== '')
        : Object.values(SkillLevel).filter((level) => level !== '');

    //@ts-ignore
    const numericLevel: number = levels.indexOf(level);

    return (
        <div className={style.level}>
            {levels.map((item, i) => (
                <div
                    key={item}
                    className={style.levelBubble}
                    style={{
                        background: setColor({
                            section: AccentColorSections.DOTS,
                            colorOf: ColorOf.FONT,
                            sectionPosition,
                        }),
                        opacity: i > numericLevel ? 0.1 : 1,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default memo(Level);
