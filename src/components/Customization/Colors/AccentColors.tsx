import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { colors } from '@/utils/colors';
import React, { useContext } from 'react';
import style from './Colors.module.scss';

const AccentColors = () => {
  const { resume } = useContext(ResumeContext);
  const mode = resume?.settings.colors.mode!;
  const accentBasic = resume?.settings.colors.basic.accent!;
  const accentAdvanced = resume?.settings.colors.advanced.accent!;
  const { updateAccentColor } = useUpdateSettings();
  return (
    <div className={style.accentColors}>
      {colors.accent.map((color) => (
        <div
          onClick={() => updateAccentColor(color, mode)}
          className={`${style.accentColor} ${
            (mode === 'basic' && accentBasic === color) ||
            (mode === 'advanced' && accentAdvanced === color)
              ? style.accentColor_selected
              : ''
          }`}
          key={color}
          style={{ background: color }}
        ></div>
      ))}
    </div>
  );
};

export default AccentColors;
