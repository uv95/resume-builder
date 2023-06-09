import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import AdvancedMulticolorIcon from './AdvancedMulticolorIcon';
import style from './Colors.module.scss';

type Props = {};

const AdvancedOptions = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const { selectOption } = useUpdateSettings();
  const selected = resume?.settings.colors.advanced.selected;
  const { accent, multicolor: selectedMulticolor } =
    resume?.settings.colors.advanced!;

  return (
    <div className="flex">
      <div
        className={style.option}
        onClick={() => selectOption('accent', 'advanced')}
      >
        <div
          className={`${style.option_accent} ${
            selected === 'accent' ? style.option__selected : ''
          }`}
          style={{ background: accent }}
        ></div>
        <p>Accent</p>
      </div>
      <div
        className={style.option}
        onClick={() => selectOption('multicolor', 'advanced')}
      >
        <AdvancedMulticolorIcon
          optionSelected={selected === 'multicolor'}
          color={selectedMulticolor}
          isOption
        />
        <p>Multicolor</p>
      </div>
    </div>
  );
};

export default AdvancedOptions;
