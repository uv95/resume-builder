import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import style from './Colors.module.scss';

type Props = {};

const Mode = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const mode = resume?.settings.colors.mode;
  const { updateMode } = useUpdateSettings();
  return (
    <div className="flex">
      <div className={style.option} onClick={() => updateMode('basic')}>
        <div
          className={`${
            mode === 'basic' ? style.basicMode_active : style.basicMode
          }`}
        ></div>
        <p>Basic</p>
      </div>
      <div className={style.option} onClick={() => updateMode('advanced')}>
        <div
          className={`${style.basicMode} ${
            mode === 'advanced' ? style.advancedMode_active : style.advancedMode
          }`}
        ></div>
        <p>Advanced</p>
      </div>
    </div>
  );
};

export default Mode;
