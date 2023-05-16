import style from './Layout.module.scss';
import React, { useContext } from 'react';
import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settingsMutations';
import { useMutation } from '@apollo/client';

const Position = () => {
  const { resume } = useContext(ResumeContext);
  const [updateSettings] = useMutation(UPDATE_SETTINGS);

  const updatePosition = (position: string, columns: number) => {
    return updateSettings({
      variables: { id: resume?.settings.id, layout: { position, columns } },
    });
  };

  return (
    <div className="flex">
      <div className={style.position} onClick={() => updatePosition('top', 1)}>
        <div
          className={`test ${style.figure} ${
            resume?.settings.layout.position === 'top'
              ? style.top_active
              : style.top
          }`}
        ></div>
        <p>Top</p>
      </div>
      <div className={style.position} onClick={() => updatePosition('left', 2)}>
        <div
          className={`test ${style.figure} ${
            resume?.settings.layout.position === 'left'
              ? style.left_active
              : style.left
          }`}
        ></div>
        <p>Left</p>
      </div>
      <div
        className={style.position}
        onClick={() => updatePosition('right', 2)}
      >
        <div
          className={`test ${style.figure} ${
            resume?.settings.layout.position === 'right'
              ? style.right_active
              : style.right
          }`}
        ></div>
        <p>Right</p>
      </div>
    </div>
  );
};

export default Position;
