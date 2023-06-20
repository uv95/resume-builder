import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import style from './Colors.module.scss';
import BasicMulticolorIcon from './BasicMulticolorIcon';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';

const BasicOptions = () => {
  const { resume } = useContext(ResumeContext);
  const selected = resume?.settings.colors.basic.selected;
  const { accent, multicolor: selectedMulticolor } =
    resume?.settings.colors.basic!;
  const { selectOption } = useUpdateSettings();

  return (
    <div className="flex">
      <div
        className={style.option}
        onClick={() => selectOption(ColorOption.ACCENT, Mode.BASIC)}
      >
        <div
          className={`${style.option_accent} ${
            selected === ColorOption.ACCENT ? style.option__selected : ''
          }`}
          style={{ background: accent }}
        ></div>
        <p>Accent</p>
      </div>
      <div
        className={style.option}
        onClick={() => selectOption(ColorOption.MULTICOLOR, Mode.BASIC)}
      >
        <BasicMulticolorIcon
          optionSelected={selected === 'multicolor'}
          color={selectedMulticolor}
          isOption
        />
        <p>Multicolor</p>
      </div>
    </div>
  );
};

export default BasicOptions;
