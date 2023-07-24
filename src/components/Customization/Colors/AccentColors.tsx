import { useColorsContext } from '@/context/settings';
import useUpdateColors from '@/hooks/settings/useUpdateColors';
import { colors } from '@/utils/colors';
import { Mode } from '@/utils/types/settingsTypes';
import React, { memo } from 'react';
import style from './Colors.module.scss';

const AccentColors = () => {
    // const { settings } = useContext(ResumeContext);
    const { colors:colorsSettings } = useColorsContext();
    const mode = colorsSettings?.mode!;
    const accentBasic = colorsSettings?.basic.accent!;
    const accentAdvanced = colorsSettings?.advanced.accent!;
    const { updateAccentColor } = useUpdateColors();
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

export default memo(AccentColors);
