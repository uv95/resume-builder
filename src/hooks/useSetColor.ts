import { ResumeContext } from '@/context/ResumeContext';
import { IApplyAccentColor } from '@/utils/types';
import { useContext } from 'react';

function useSetColor() {
  const { resume } = useContext(ResumeContext);
  const { position } = resume?.settings.layout!;
  const { mode, basic, advanced, applyAccentColor } = resume?.settings.colors!;
  const { accent: accentBasic, multicolor: multicolorBasic } = basic;
  const { accent: accentAdvanced, multicolor: multicolorAdvanced } = advanced;

  type SetColorType = {
    section: Partial<IApplyAccentColor>;
    colorOf: 'font' | 'background';
    sectionPosition: 'top' | 'left' | 'right';
  };

  const setColor = ({ section, colorOf, sectionPosition }: SetColorType) => {
    // basic
    if (mode === 'basic') {
      // basic accent
      if (basic.selected === 'accent') {
        if (colorOf === 'font')
          return applyAccentColor[section as keyof typeof applyAccentColor]
            ? accentBasic
            : '#000000';
        if (colorOf === 'background') return '#ffffff';
      }
      // basic multicolor
      if (basic.selected === 'multicolor') {
        if (colorOf === 'font')
          return applyAccentColor[section as keyof typeof applyAccentColor]
            ? multicolorBasic.accent
            : multicolorBasic[colorOf];
        if (colorOf === 'background') return '#ffffff';
      }
    }

    //advanced
    if (mode === 'advanced') {
      // advanced accent
      if (advanced.selected === 'accent') {
        if (
          (sectionPosition === 'top' && position === 'top') ||
          (sectionPosition === 'left' && position === 'left') ||
          (sectionPosition === 'right' && position === 'right')
        ) {
          if (colorOf === 'font') return '#ffffff';
          if (colorOf === 'background') return accentAdvanced;
        }

        if (colorOf === 'font')
          return applyAccentColor[section as keyof typeof applyAccentColor]
            ? accentAdvanced
            : '#000000';
        if (colorOf === 'background') return '#ffffff';
      }
      // advanced multicolor
      if (advanced.selected === 'multicolor') {
        if (
          (sectionPosition === 'top' && position === 'top') ||
          (sectionPosition === 'left' && position === 'left') ||
          (sectionPosition === 'right' && position === 'right')
        ) {
          if (colorOf === 'font')
            return applyAccentColor[section as keyof typeof applyAccentColor]
              ? multicolorAdvanced.primary.accent
              : multicolorAdvanced.primary.font;
          if (colorOf === 'background')
            return multicolorAdvanced.primary.background;
        }

        if (colorOf === 'font')
          return applyAccentColor[section as keyof typeof applyAccentColor]
            ? multicolorAdvanced.secondary.accent
            : multicolorAdvanced.secondary.font;
        if (colorOf === 'background')
          return multicolorAdvanced.secondary.background;
      }
    }
  };

  return { setColor };
}

export default useSetColor;
