import {
    ILanguageItem,
    ISkillsItem,
    LanguageLevel,
    SkillLevel,
} from '@/utils/types/contentTypes';
import { ISettings, Sections } from '@/utils/types/resumeTypes';
import {
    Format,
    Position
} from '@/utils/types/settingsTypes';
import style from './SkillsLanguageBlock.module.scss';
import Level from './Level';
import SkillsLanguageItem from './SkillsLanguageItem';
import { memo } from 'react';
import { useLayoutContext } from '@/context/settings';

type Props = {
  section: Sections.LANGUAGE | Sections.SKILLS;
  sectionPosition?: Position.LEFT | Position.RIGHT;
  items:ISkillsItem[] | ILanguageItem[]
  settings: ISettings
};

const SkillsLanguageBlock = ({ section, sectionPosition,items,settings }: Props) => {
    const { format, gridCols } =
    settings![section]!;
    const {layout} = useLayoutContext();
    const  columns  = layout?.columns!;

    const itemsStyle = {
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
        marginBottom:
(format === Format.LEVEL || format === Format.GRID) &&
columns === 2
    ? '1rem'
    : 0,
    }
    return (
        <>
            {items.length!==0 && (
                <div style={itemsStyle} className={`${style[format + 'Format']}`}>
                    {items.map((item, i) => (
                        <div key={item.id} style={itemStyle}>
                            <div className="flex spaceBetween aligned">
                                <SkillsLanguageItem item={item} settings={settings}
                                    itemsLength={items.length} 
                                    index={i} 
                                    section={section} 
                                    sectionPosition={sectionPosition} />

                                {format === Format.LEVEL && (section === Sections.LANGUAGE ?
                                    item['languageLevel' as keyof typeof item] : 
                                    item['skillLevel' as keyof typeof item]) && 
                                    ( <Level level={section === Sections.LANGUAGE ? 
                                        (item['languageLevel' as keyof typeof item] as LanguageLevel)
                                        : (item['skillLevel' as keyof typeof item] as SkillLevel)} 
                                    // eslint-disable-next-line react/jsx-indent-props
                                    section={section}
                                    // eslint-disable-next-line react/jsx-indent-props
                                    sectionPosition={sectionPosition}/>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default memo(SkillsLanguageBlock);
