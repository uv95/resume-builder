import useSetColor from '@/hooks/useSetColor';
import React from 'react';
import style from '../Page.module.scss';

type Props = {
  section: 'language' | 'skills';
  level: string;
  sectionPosition?: 'left' | 'right';
};

const Level = ({ section, level, sectionPosition }: Props) => {
  const { setColor } = useSetColor();

  const levels =
    section === 'language'
      ? [
          'Beginner (A1)',
          'Elementary (A2)',
          'Limited working proficiency (B1)',
          'Highly proficient (B2-C1)',
          'Native / full working proficiency (C2)',
        ]
      : ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

  return (
    <div className={style.level}>
      {levels.map((item, i) => (
        <div
          key={item}
          className={style.levelBubble}
          style={{
            background: setColor({
              section: 'dots',
              colorOf: 'font',
              sectionPosition,
            }),
            opacity: i > levels.indexOf(level) ? 0.1 : 1,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Level;
