import { ResumeContext } from '@/context/ResumeContext';
import {
  IApplyAccentColor,
  IAdvancedMulticolor,
  IBasicMulticolor,
  Mode,
  Position,
  ColorOption,
  AccentColorSections,
  ColorOf,
} from '@/utils/types/settingsTypes';
import { useContext, useEffect, useState } from 'react';

function useSetColor() {
  const { resume } = useContext(ResumeContext);
  const [settings, setSettings] = useState<{
    position: Position;
    mode: Mode;
    basicSelected: ColorOption;
    advancedSelected: ColorOption;
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
    section?: AccentColorSections;
    colorOf: ColorOf;
    sectionPosition?: Position;
  };

  const setColor = ({ section, colorOf, sectionPosition }: SetColorType) => {
    // basic
    if (settings?.mode === Mode.BASIC) {
      // basic accent
      if (settings?.basicSelected === ColorOption.ACCENT) {
        if (colorOf === ColorOf.FONT)
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.accentBasic
            : '#000000';
        if (colorOf === ColorOf.BG) return '#ffffff';
      }
      // basic multicolor
      if (settings?.basicSelected === ColorOption.MULTICOLOR) {
        if (colorOf === ColorOf.FONT)
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.multicolorBasic.accent
            : settings?.multicolorBasic[colorOf];
        if (colorOf === ColorOf.BG) return '#ffffff';
      }
    }

    //advanced
    if (settings?.mode === Mode.ADVANCED) {
      // advanced accent
      if (settings?.advancedSelected === ColorOption.ACCENT) {
        if (
          (sectionPosition === Position.TOP &&
            settings?.position === Position.TOP) ||
          (sectionPosition === Position.LEFT &&
            settings?.position === Position.LEFT) ||
          (sectionPosition === Position.RIGHT &&
            settings?.position === Position.RIGHT)
        ) {
          if (colorOf === ColorOf.FONT) return '#ffffff';
          if (colorOf === ColorOf.BG) return settings?.accentAdvanced;
        }

        if (colorOf === ColorOf.FONT)
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.accentAdvanced
            : '#000000';
        if (colorOf === ColorOf.BG) return '#ffffff';
      }
      // advanced multicolor
      if (settings?.advancedSelected === ColorOption.MULTICOLOR) {
        if (
          (sectionPosition === Position.TOP &&
            settings?.position === Position.TOP) ||
          (sectionPosition === Position.LEFT &&
            settings?.position === Position.LEFT) ||
          (sectionPosition === Position.RIGHT &&
            settings?.position === Position.RIGHT)
        ) {
          if (colorOf === ColorOf.FONT)
            return settings?.applyAccentColor[
              section as keyof typeof settings.applyAccentColor
            ]
              ? settings?.multicolorAdvanced.primary.accent
              : settings?.multicolorAdvanced.primary.font;
          if (colorOf === ColorOf.BG)
            return settings?.multicolorAdvanced.primary.background;
        }

        if (colorOf === ColorOf.FONT)
          return settings?.applyAccentColor[
            section as keyof typeof settings.applyAccentColor
          ]
            ? settings?.multicolorAdvanced.secondary.accent
            : settings?.multicolorAdvanced.secondary.font;
        if (colorOf === ColorOf.BG)
          return settings?.multicolorAdvanced.secondary.background;
      }
    }
  };

  return { setColor };
}

export default useSetColor;
