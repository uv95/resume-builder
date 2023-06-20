import Button from '@/components/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { Mode } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import style from './Colors.module.scss';

const ModeComponent = () => {
  const { resume } = useContext(ResumeContext);
  const mode = resume?.settings.colors.mode;
  const { updateMode } = useUpdateSettings();
  return (
    <div className="flex">
      <div className={style.option} onClick={() => updateMode(Mode.BASIC)}>
        <Button
          btnType="customization"
          className={`${style.mode} circle`}
          isActive={mode === 'basic'}
        />
        <p>Basic</p>
      </div>
      <div className={style.option} onClick={() => updateMode(Mode.ADVANCED)}>
        <Button
          btnType="customization"
          className={`${style.mode} ${
            mode === Mode.ADVANCED
              ? style.advancedMode_active
              : style.advancedMode
          } circle`}
          isActive={mode === Mode.ADVANCED}
        />
        <p>Advanced</p>
      </div>
    </div>
  );
};

export default ModeComponent;
