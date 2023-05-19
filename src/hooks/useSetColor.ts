import { ResumeContext } from '@/context/ResumeContext';
import {
  IApplyAccentColor,
  IAdvancedMulticolor,
  IBasicMulticolor,
} from '@/utils/types';
import { useContext, useEffect, useState } from 'react';

function useSetColor() {
  const { resume } = useContext(ResumeContext);
  const [settings, setSettings] = useState<{
    position: 'top' | 'left' | 'right';
    mode: 'basic' | 'advanced';
    basicSelected: 'accent' | 'multicolor';
    advancedSelected: 'accent' | 'multicolor';
    applyAccentColor: IApplyAccentColor;
    accentBasic: string;
    multicolorBasic: IBasicMulticolor;
    accentAdvanced: string;
    multicolorAdvanced: IAdvancedMulticolor;
  } | null>(null);

  useEffect(() => {
    setSettings({
      position: resume?.settings.layout.position!,
      mode: resume?.settings?.colors.mode!,
      basicSelected: resume?.settings?.colors.basic.selected!,
      advancedSelected: resume?.settings?.colors.advanced.selected!,
      applyAccentColor: resume?.settings?.colors.applyAccentColor!,
      accentBasic: resume?.settings?.colors.basic.accent!,
      multicolorBasic: resume?.settings?.colors.basic.multicolor!,
      accentAdvanced: resume?.settings?.colors.advanced.accent!,
      multicolorAdvanced: resume?.settings?.colors.advanced.multicolor!,
    });
  }, [resume?.settings]);

  type SetColorType = {
    section?:
      | 'name'
      | 'dots'
      | 'headings'
      | 'dates'
      | 'headingsLine'
      | 'linkIcons'
      | 'headerIcons';
    colorOf: 'font' | 'background';
    sectionPosition?: 'top' | 'left' | 'right';
  };

  const setColor = ({ section, colorOf, sectionPosition }: SetColorType) => {
    // basic
    if (settings?.mode === 'basic') {
      // basic accent
      if (settings?.basicSelected === 'accent') {
        if (colorOf === 'font')
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.accentBasic
            : '#000000';
        if (colorOf === 'background') return '#ffffff';
      }
      // basic multicolor
      if (settings?.basicSelected === 'multicolor') {
        if (colorOf === 'font')
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.multicolorBasic.accent
            : settings?.multicolorBasic[colorOf];
        if (colorOf === 'background') return '#ffffff';
      }
    }

    //advanced
    if (settings?.mode === 'advanced') {
      // advanced accent
      if (settings?.advancedSelected === 'accent') {
        if (
          (sectionPosition === 'top' && settings?.position === 'top') ||
          (sectionPosition === 'left' && settings?.position === 'left') ||
          (sectionPosition === 'right' && settings?.position === 'right')
        ) {
          if (colorOf === 'font') return '#ffffff';
          if (colorOf === 'background') return settings?.accentAdvanced;
        }

        if (colorOf === 'font')
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.accentAdvanced
            : '#000000';
        if (colorOf === 'background') return '#ffffff';
      }
      // advanced multicolor
      if (settings?.advancedSelected === 'multicolor') {
        if (
          (sectionPosition === 'top' && settings?.position === 'top') ||
          (sectionPosition === 'left' && settings?.position === 'left') ||
          (sectionPosition === 'right' && settings?.position === 'right')
        ) {
          if (colorOf === 'font')
            return settings?.applyAccentColor[
              section as keyof typeof settings.applyAccentColor
            ]
              ? settings?.multicolorAdvanced.primary.accent
              : settings?.multicolorAdvanced.primary.font;
          if (colorOf === 'background')
            return settings?.multicolorAdvanced.primary.background;
        }

        if (colorOf === 'font')
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.multicolorAdvanced.secondary.accent
            : settings?.multicolorAdvanced.secondary.font;
        if (colorOf === 'background')
          return settings?.multicolorAdvanced.secondary.background;
      }
    }
  };

  return { setColor };
}

export default useSetColor;
