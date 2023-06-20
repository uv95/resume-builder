import { ResumeContext } from '@/context/ResumeContext';
import { colors } from '@/utils/colors';
import { IBasicMulticolor } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import BasicMulticolorIcon from './BasicMulticolorIcon';

const BasicMulticolor = () => {
  const { resume } = useContext(ResumeContext);
  const selectedColor: IBasicMulticolor =
    resume?.settings.colors.basic.multicolor!;

  const areColorsEqual = (
    colors1: IBasicMulticolor,
    colors2: IBasicMulticolor
  ) => {
    return (
      colors1.background === colors2.background &&
      colors1.accent === colors2.accent &&
      colors1.font === colors2.font
    );
  };

  return (
    <div className="flex flexWrap gap-1">
      {colors.basicMulticolor.map((color) => (
        <BasicMulticolorIcon
          key={color.accent}
          color={color}
          optionSelected={areColorsEqual(color, selectedColor)}
        />
      ))}
    </div>
  );
};

export default BasicMulticolor;
