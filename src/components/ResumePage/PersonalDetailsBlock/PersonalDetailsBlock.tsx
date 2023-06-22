import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import {
    AccentColorSections,
    ColorOf,
    FontStyle,
    Position,
} from '@/utils/types/settingsTypes';
import React, { useContext, useEffect, useState } from 'react';
import AdditionalInfoBlock from './AdditionalInfoBlock';

const PersonalDetailsBlock = () => {
    const { resume } = useContext(ResumeContext);

    const { position } = resume?.settings.layout!;
    const content = resume?.content.personalDetails;
    const { leftRightMargin, topBottomMargin, fontSize } =
    resume?.settings.spacing!;
    const { position: headerPosition } = resume?.settings.header!;
    const { size: jobTitleSize, style: jobTitleStyle } =
    resume?.settings.jobTitle!;
    const { style: nameStyle, size: nameSize } = resume?.settings.name!;

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

    const { setColor } = useSetColor();

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
                {content?.fullName}
            </p>
            <p
                style={{
                    fontSize: jobTitleFontSize[jobTitleSize] + 'px',
                    fontWeight: jobTitleStyle === FontStyle.BOLD ? 'bold' : 'normal',
                    fontStyle: jobTitleStyle === FontStyle.ITALIC ? 'italic' : 'normal',
                }}
            >
                {content?.jobTitle}
            </p>

            <AdditionalInfoBlock />
        </div>
    );
};

export default PersonalDetailsBlock;
