import { ResumeContext } from '@/context/ResumeContext';
import { colors } from '@/utils/colors';
import { IAdvancedMulticolor } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import AdvancedMulticolorIcon from './AdvancedMulticolorIcon';

type Props = {};

const AdvancedMulticolor = (props: Props) => {
    const { settings } = useContext(ResumeContext);
    const selectedColor: IAdvancedMulticolor =
   settings?.colors.advanced.multicolor!;

    const areColorsEqual = (
        colors1: IAdvancedMulticolor,
        colors2: IAdvancedMulticolor
    ) => {
        return (
            colors1.primary.background === colors2.primary.background &&
      colors1.primary.accent === colors2.primary.accent &&
      colors1.primary.font === colors2.primary.font &&
      colors1.secondary.background === colors2.secondary.background &&
      colors1.secondary.accent === colors2.secondary.accent &&
      colors1.secondary.font === colors2.secondary.font
        );
    };
    return (
        <div className="flex flexWrap gap-1">
            {colors.advancedMulticolor.map((color) => (
                <AdvancedMulticolorIcon
                    key={color.primary.accent + color.primary.font}
                    color={color}
                    optionSelected={areColorsEqual(color, selectedColor)}
                />
            ))}
        </div>
    );
};

export default AdvancedMulticolor;
