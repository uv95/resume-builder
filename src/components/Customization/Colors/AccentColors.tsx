import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { colors } from '@/utils/colors';
import { Mode } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import style from './Colors.module.scss';

const AccentColors = () => {
    const { settings } = useContext(ResumeContext);
    const mode = settings?.colors.mode!;
    const accentBasic = settings?.colors.basic.accent!;
    const accentAdvanced = settings?.colors.advanced.accent!;
    const { updateAccentColor } = useUpdateSettings();
    return (
        <div className={style.accentColors}>
            {colors.accent.map((color) => (
                <div
                    onClick={() => updateAccentColor(color, mode)}
                    className={`${style.accentColor} ${
                        (mode === Mode.BASIC && accentBasic === color) ||
            (mode === Mode.ADVANCED && accentAdvanced === color)
                            ? style.accentColor_selected
                            : ''
                    }`}
                    key={color}
                    style={{ background: color }}
                ></div>
            ))}
        </div>
    );
};

export default AccentColors;
