import DetailsIcons from '@/components/DetailsIcons';
import { useLayoutContext } from '@/context/LayoutContext';
import { useSpacingContext } from '@/context/SpacingContext';
import useSetColor from '@/hooks/useSetColor';
import { IContent, ISettings } from '@/utils/types/resumeTypes';
import {
    AccentColorSections,
    ColorOf,
    HeaderAdditionalInfoStyle,
    HeaderPosition,
    Position,
} from '@/utils/types/settingsTypes';
import { memo } from 'react';
import style from './PersonalDetailsBlock.module.scss';

type Props = {settings: ISettings ,content:IContent}

const AdditionalInfoBlock = ({settings,content}:Props) => {
    const {spacing} = useSpacingContext()
    const {layout} = useLayoutContext();
    const  position  = layout?.position;
    const personalDetails = content?.personalDetails;
    const { fontSize } = spacing!;
    const {
        additionalInfoOrder,
        additionalInfoStyle,
        position: headerPosition,
    } = settings?.header!;

    const additionalInfo = personalDetails
        ? Object.values(personalDetails)[Object.values(personalDetails).length - 1]
        : [];

    const { setColor } = useSetColor();

    const addBar = (condition: boolean) => {
        const shouldAddBar = additionalInfoStyle === HeaderAdditionalInfoStyle.BAR &&
        ((headerPosition !== HeaderPosition.LEFT && position !== Position.TOP) ||
          position === Position.TOP) &&
        condition;
        return shouldAddBar ? '  |': null
        
    }

    return (
        <div
            className={style.infoBlock}
            style={{
                color: setColor({
                    colorOf: ColorOf.FONT,
                    sectionPosition: position,
                }),
                display:
          headerPosition === HeaderPosition.LEFT &&
          (position === Position.LEFT || position === Position.RIGHT)
              ? 'block'
              : 'flex',
                justifyContent:
          headerPosition === HeaderPosition.CENTER ? 'center' : 'flex-start',
            }}
        >
            {personalDetails &&
        ['email', 'phone', 'address'].map(
            (item) =>
                personalDetails[item as keyof typeof personalDetails] && (
                    <div key={item} className={style.info}>
                        {additionalInfoStyle === HeaderAdditionalInfoStyle.ICON && (
                            <DetailsIcons
                                fill={setColor({
                                    section: AccentColorSections.HEADER_ICONS,
                                    colorOf: ColorOf.FONT,
                                    sectionPosition: position,
                                })!
                                }
                                size={fontSize}
                                dataName={item}
                            />
                        )}
                        <p>
                            <>
                                {personalDetails[item as keyof typeof personalDetails]} {addBar(additionalInfo.length !== 0)}
                            </>
                        </p>
                    </div>
                )
        )}

      {...additionalInfo.map((item: any, i: number) => (
          <div className={style.info} key={item.name}>
              {additionalInfoStyle === HeaderAdditionalInfoStyle.ICON && (
                  <DetailsIcons
                      fill={setColor({
                          section: AccentColorSections.HEADER_ICONS,
                          colorOf: ColorOf.FONT,
                          sectionPosition: position,
                      })!
                      }
                      size={fontSize}
                      dataName={item.name}
                  />
              )}
              <div>
                  {item.isLink ? <a href={item.input}>{item.input}</a> : item.input}
                  {addBar(i !== additionalInfo.length - 1)}
              </div>
          </div>
      ))}
        </div>
    );
};

export default memo(AdditionalInfoBlock);
