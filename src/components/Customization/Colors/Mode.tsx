import Button from '@/components/Button/Button';
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
        <Button
          type="customization"
          classes={`${style.mode} circle`}
          active={mode === 'basic'}
        />
        <p>Basic</p>
      </div>
      <div className={style.option} onClick={() => updateMode('advanced')}>
        <Button
          type="customization"
          classes={`${style.mode} ${
            mode === 'advanced' ? style.advancedMode_active : style.advancedMode
          } circle`}
          active={mode === 'advanced'}
        />
        <p>Advanced</p>
      </div>
    </div>
  );
};

export default Mode;
