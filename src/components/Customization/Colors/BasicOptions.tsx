import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import style from './Colors.module.scss';
import BasicMulticolorIcon from './BasicMulticolorIcon';
import useUpdateSettings from '@/hooks/useUpdateSettings';

type Props = {};

const BasicOptions = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const selected = resume?.settings.colors.basic.selected;
  const selectedMulticolor = resume?.settings.colors.basic.multicolor!;
  const { selectOption } = useUpdateSettings();

  return (
    <div className="flex">
      <div
        className={style.option}
        onClick={() => selectOption('accent', 'basic')}
      >
        <div
          className={`${style.option_accent} ${
            selected === 'accent' ? style.option__selected : ''
          }`}
          style={{ background: 'red' }}
        ></div>
        <p>Accent</p>
      </div>
      <div
        className={style.option}
        onClick={() => selectOption('multicolor', 'basic')}
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
