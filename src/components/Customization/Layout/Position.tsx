import style from './Layout.module.scss';
import React, { useContext } from 'react';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import Button from '@/components/Button/Button';

const Position = () => {
  const { resume } = useContext(ResumeContext);
  const { position } = resume?.settings.layout!;
  const { updatePosition } = useUpdateSettings();

  return (
    <div className="flex">
      <div className={style.position} onClick={() => updatePosition('top', 1)}>
        <Button
          type="customization"
          active={position === 'top'}
          classes={`${style.figure} ${
            position === 'top' ? style.top_active : style.top
          }`}
        />
        <p>Top</p>
      </div>
      <div className={style.position} onClick={() => updatePosition('left', 2)}>
        <Button
          type="customization"
          active={position === 'left'}
          classes={`${style.figure} ${
            position === 'left' ? style.left_active : style.left
          }`}
        />
        <p>Left</p>
      </div>
      <div
        className={style.position}
        onClick={() => updatePosition('right', 2)}
      >
        <Button
          type="customization"
          active={position === 'right'}
          classes={`${style.figure} ${
            position === 'right' ? style.right_active : style.right
          }`}
        />
        <p>Right</p>
      </div>
    </div>
  );
};

export default Position;
