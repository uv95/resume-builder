import DetailsIcons from '@/components/DetailsIcons';
import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import {
    AccentColorSections,
    ColorOf,
    HeaderAdditionalInfoStyle,
    HeaderPosition,
    Position,
} from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import style from '../Page.module.scss';

const AdditionalInfoBlock = () => {
    const { resume } = useContext(ResumeContext);
    const { position } = resume?.settings.layout!;
    const content = resume?.content.personalDetails;
    const { fontSize } = resume?.settings.spacing!;
    const {
        additionalInfoOrder,
        additionalInfoStyle,
        position: headerPosition,
    } = resume?.settings.header!;

    const additionalInfo = content
        ? Object.values(content)[Object.values(content).length - 1]
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
            {content &&
        ['email', 'phone', 'address'].map(
            (item) =>
                content[item as keyof typeof content] && (
                    <div key={item} className={style.info}>
                        {additionalInfoStyle === HeaderAdditionalInfoStyle.ICON && (
                            <DetailsIcons
                                fill={
                      setColor({
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
                            {content[item as keyof typeof content]} {addBar(additionalInfo.length !== 0)}
                        </p>
                    </div>
                )
        )}

      {...additionalInfo.map((item: any, i: number) => (
          <div className={style.info} key={item.name}>
              {additionalInfoStyle === HeaderAdditionalInfoStyle.ICON && (
                  <DetailsIcons
                      fill={
                setColor({
                    section: AccentColorSections.HEADER_ICONS,
                    colorOf: ColorOf.FONT,
                    sectionPosition: position,
                })!
                      }
                      size={fontSize}
                      dataName={item.name}
                  />
              )}
              <p>
                  {item.input} {addBar(i !== additionalInfo.length - 1)}
              </p>
          </div>
      ))}
        </div>
    );
};

export default AdditionalInfoBlock;
