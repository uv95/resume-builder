import { ResumeContext } from '@/context/ResumeContext';
import { ISettings } from '@/utils/types/resumeTypes';
import {
    Mode,
    Position,
    ColorOption,
    AccentColorSections,
    ColorOf,
} from '@/utils/types/settingsTypes';
import { useContext } from 'react';

function useSetColor(settings:ISettings) {
    // const { settings } = useContext(ResumeContext);
    const position = settings?.layout.position;
    const mode = settings?.colors.mode!;
    const applyAccentColor = settings?.colors.applyAccentColor!;
    const basicSelected = settings?.colors.basic.selected!;
    const  accentBasic = settings?.colors.basic.accent!;
    const multicolorBasic = settings?.colors.basic.multicolor!;
    const advancedSelected = settings?.colors.advanced.selected!
    const accentAdvanced = settings?.colors.advanced.accent!
    const  multicolorAdvanced = settings?.colors.advanced.multicolor!

  type SetColorType = {
    section?: AccentColorSections;
    colorOf: ColorOf;
    sectionPosition?: Position;
  };

  const setColor = ({ section, colorOf, sectionPosition }: SetColorType) => {
      // basic
      if (mode === Mode.BASIC) {
      // basic accent
          if (basicSelected === ColorOption.ACCENT) {
              if (colorOf === ColorOf.FONT)
                  return applyAccentColor[
            section as keyof typeof applyAccentColor
                  ]
                      ? accentBasic
                      : '#000000';
              if (colorOf === ColorOf.BG) return '#ffffff';
          }
          // basic multicolor
          if (basicSelected === ColorOption.MULTICOLOR) {
              if (colorOf === ColorOf.FONT)
                  return applyAccentColor[
            section as keyof typeof applyAccentColor
                  ]
                      ? multicolorBasic.accent
                      : multicolorBasic[colorOf];
              if (colorOf === ColorOf.BG) return '#ffffff';
          }
      }

      //advanced
      if (mode === Mode.ADVANCED) {
      // advanced accent
          if (advancedSelected === ColorOption.ACCENT) {
              if (
                  (sectionPosition === Position.TOP &&
            position === Position.TOP) ||
          (sectionPosition === Position.LEFT &&
            position === Position.LEFT) ||
          (sectionPosition === Position.RIGHT &&
            position === Position.RIGHT)
              ) {
                  if (colorOf === ColorOf.FONT) return '#ffffff';
                  if (colorOf === ColorOf.BG) return accentAdvanced;
              }

              if (colorOf === ColorOf.FONT)
                  return applyAccentColor[
            section as keyof typeof applyAccentColor
                  ]
                      ? accentAdvanced
                      : '#000000';
              if (colorOf === ColorOf.BG) return '#ffffff';
          }
          // advanced multicolor
          if (advancedSelected === ColorOption.MULTICOLOR) {
              if (
                  (sectionPosition === Position.TOP &&
            position === Position.TOP) ||
          (sectionPosition === Position.LEFT &&
            position === Position.LEFT) ||
          (sectionPosition === Position.RIGHT &&
            position === Position.RIGHT)
              ) {
                  if (colorOf === ColorOf.FONT)
                      return applyAccentColor[
              section as keyof typeof applyAccentColor
                      ]
                          ? multicolorAdvanced.primary.accent
                          : multicolorAdvanced.primary.font;
                  if (colorOf === ColorOf.BG)
                      return multicolorAdvanced.primary.background;
              }

              if (colorOf === ColorOf.FONT)
                  return applyAccentColor[
            section as keyof typeof applyAccentColor
                  ]
                      ? multicolorAdvanced.secondary.accent
                      : multicolorAdvanced.secondary.font;
              if (colorOf === ColorOf.BG)
                  return multicolorAdvanced.secondary.background;
          }
      }
  };

  return { setColor };
}

export default useSetColor;
