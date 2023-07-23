import { useSpacingContext } from '@/context/SpacingContext';
import useSetColor from '@/hooks/useSetColor';
import { IContent, ISettings } from '@/utils/types/resumeTypes';
import {
    AccentColorSections,
    ColorOf,
    FontStyle,
    Position,
} from '@/utils/types/settingsTypes';
import React, {  memo, useEffect, useState } from 'react';
import AdditionalInfoBlock from './AdditionalInfoBlock';

type Props = {settings: ISettings,content:IContent}

const PersonalDetailsBlock = ({settings,content}:Props) => {
    const { spacing } =useSpacingContext();

    const { position } = settings?.layout!;
    const personalDetails = content?.personalDetails;
    const { leftRightMargin, topBottomMargin, fontSize } =
    spacing!;
    const { position: headerPosition } = settings?.header!;
    const { size: jobTitleSize, style: jobTitleStyle } =
    settings?.jobTitle!;
    const { style: nameStyle, size: nameSize } = settings?.name!;

    const [jobTitleFontSize, setJobTitleFontSize] = useState({
        s: fontSize + 3,
        m: fontSize + 5,
        l: fontSize + 7,
    });
    const [nameFontSize, setNameFontSize] = useState({
        s: fontSize + 12,
        m: fontSize + 15,
        l: fontSize + 18,
    });

    useEffect(() => {
        setJobTitleFontSize({ s: fontSize + 3, m: fontSize + 5, l: fontSize + 7 });
        setNameFontSize({
            s: fontSize + 12,
            m: fontSize + 15,
            l: fontSize + 18,
        });
    }, [fontSize]);

    const { setColor } = useSetColor(settings);

    const personalDetailsStyle = {
        background: setColor({
            colorOf: ColorOf.BG,
            sectionPosition: position,
        }),
        color: setColor({
            section: AccentColorSections.NAME,
            colorOf: ColorOf.FONT,
            sectionPosition: position,
        }),
        paddingLeft: position === Position.TOP ? leftRightMargin + 'mm' : 0,
        paddingRight: position === Position.TOP ? leftRightMargin + 'mm' : 0,
        paddingTop: position === Position.TOP ? topBottomMargin + 'mm' : '0',
        paddingBottom: `calc(${topBottomMargin}mm - 1rem)`,
        textAlign: headerPosition,
    };

    return (
        <div style={personalDetailsStyle}>
            <p
                style={{
                    fontSize: nameFontSize[nameSize] + 'px',
                    fontWeight: nameStyle === FontStyle.BOLD ? 'bold' : 'normal',
                }}
            >
                {personalDetails?.fullName}
            </p>
            <p
                style={{
                    fontSize: jobTitleFontSize[jobTitleSize] + 'px',
                    fontWeight: jobTitleStyle === FontStyle.BOLD ? 'bold' : 'normal',
                    fontStyle: jobTitleStyle === FontStyle.ITALIC ? 'italic' : 'normal',
                }}
            >
                {personalDetails?.jobTitle}
            </p>

            <AdditionalInfoBlock settings={settings} content={content}/>
        </div>
    );
};

export default memo(PersonalDetailsBlock);
