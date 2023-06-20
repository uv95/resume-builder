import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import AdvancedMulticolorIcon from './AdvancedMulticolorIcon';
import style from './Colors.module.scss';

const AdvancedOptions = () => {
  const { resume } = useContext(ResumeContext);
  const { selectOption } = useUpdateSettings();
  const selected = resume?.settings.colors.advanced.selected;
  const { accent, multicolor: selectedMulticolor } =
    resume?.settings.colors.advanced!;

  return (
    <div className="flex">
      <div
        className={style.option}
        onClick={() => selectOption(ColorOption.ACCENT, Mode.ADVANCED)}
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
        onClick={() => selectOption(ColorOption.MULTICOLOR, Mode.ADVANCED)}
      >
        <AdvancedMulticolorIcon
          optionSelected={selected === ColorOption.MULTICOLOR}
          color={selectedMulticolor}
          isOption
        />
        <p>Multicolor</p>
      </div>
    </div>
  );
};

export default AdvancedOptions;
