import useSetColor from '@/hooks/useSetColor';
import { ISettings } from '@/utils/types/resumeTypes';
import {
    AccentColorSections,
    ColorOf,
    HeadingStyle,
    Position,
} from '@/utils/types/settingsTypes';
import React, {  useState } from 'react';
import style from './Heading.module.scss';

type Props = {
  sectionPosition: Position.LEFT | Position.RIGHT | undefined;
  sectionName: string;
  settings:ISettings;
  sectionIndex:number
};

const Heading = ({ sectionPosition, sectionName, settings,sectionIndex }: Props) => {
    const { setColor } = useSetColor(settings);
    const { style: headingStyle, size, uppercase } = settings?.heading!;
    const { fontSize,spaceBetweenSections } = settings?.spacing!;
    const [headingSize] = useState({
        s: fontSize + 1.5,
        m: fontSize + 3,
        l: fontSize + 4.5,
    });

    return (
        <>
            <div
                className={`${
                    headingStyle === HeadingStyle.TOP_BOTTOM_LINE
                        ? style.headingTopBottomLine
                        : ''
                } ${headingStyle === HeadingStyle.BOX ? style.headingBox : ''}`}
                style={{
                    color: setColor({
                        section: AccentColorSections.HEADINGS,
                        colorOf: ColorOf.FONT,
                        sectionPosition,
                    }),
                    fontSize: headingSize[size] + 'px',
                    fontWeight: 700,
                    borderColor: setColor({
                        section: AccentColorSections.HEADINGS,
                        colorOf: ColorOf.FONT,
                        sectionPosition,
                    }),
                    marginBottom: headingStyle !== HeadingStyle.LINE ? '1rem' : 0,
                    marginTop: sectionIndex===0 ? 0 : spaceBetweenSections + 'px'
                }}
            >
                {uppercase ? sectionName.toUpperCase() : sectionName}
                {headingStyle === HeadingStyle.BOX && (
                    <div
                        className={style.headingBackground}
                        style={{
                            background:
                headingStyle === HeadingStyle.BOX
                    ? setColor({
                        section: AccentColorSections.HEADINGS,
                        colorOf: ColorOf.FONT,
                        sectionPosition,
                    })
                    : 'inherit',
                        }}
                    ></div>
                )}
            </div>
            {headingStyle === HeadingStyle.LINE && (
                <div
                    style={{
                        width: '100%',
                        height: '0.2rem',
                        background: setColor({
                            section: AccentColorSections.HEADINGS_LINE,
                            colorOf: ColorOf.FONT,
                            sectionPosition,
                        }),
                        marginTop: '-1px',
                        marginBottom: '1rem',
                    }}
                ></div>
            )}
        </>
    );
};

export default Heading;
