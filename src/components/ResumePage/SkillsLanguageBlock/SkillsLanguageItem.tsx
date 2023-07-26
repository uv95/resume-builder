import { useColorsContext, useLayoutContext } from '@/context/settings';
import useSetColor from '@/hooks/useSetColor';
import { getDivider } from '@/utils/getDivider';
import { ILanguageItem, ISkillsItem } from '@/utils/types/contentTypes';
import { ISettings, Sections } from '@/utils/types/resumeTypes'
import { AccentColorSections, ColorOf, Format, Position } from '@/utils/types/settingsTypes'
import { memo } from 'react';
import style from './SkillsLanguageBlock.module.scss';

type Props = {item:ISkillsItem|ILanguageItem;
    section: Sections.LANGUAGE | Sections.SKILLS;
  sectionPosition?: Position.LEFT | Position.RIGHT;
  itemsLength: number;
  index:number
  settings: ISettings
}

const SkillsLanguageItem = ({item, section, sectionPosition, itemsLength, index, settings}: Props) => {
    const { format, textFormat, infoItalic } =
    settings![section]!;
    const { colors } = useColorsContext();
    const {layout} = useLayoutContext();
    const { setColor } = useSetColor();

    const applyAccentColor = colors?.applyAccentColor;
    const position = layout?.position;

    const itemStyle = {
        display:
      format === Format.GRID || format === Format.LEVEL ? 'block' : 'flex',
        background:
      format === Format.BUBBLE && applyAccentColor?.dots
          ? setColor({
              section: AccentColorSections.DOTS,
              colorOf: ColorOf.FONT,
              sectionPosition,
          })
          : 'inherit',
        color:
      format === Format.BUBBLE && applyAccentColor?.dots
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

    const itemInfoStyle={
        marginLeft:
format === Format.TEXT || format === Format.BUBBLE
    ? '0.5rem'
    : 0,
        fontStyle: infoItalic ? 'italic' : 'normal',
    }

    return (
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
                <p style={itemInfoStyle}>
                    {format === Format.GRID || format === Format.LEVEL
                        ? item.info
                        : `(${item.info})`}
                </p>
            )}
            {format === Format.TEXT && itemsLength - 1 !== index && getDivider(textFormat)}
        </div>
    )
}

export default memo(SkillsLanguageItem)