import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settingsMutations';
import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import style from './Layout.module.scss';

const ColumnWidth = () => {
  const { resume } = useContext(ResumeContext);
  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  const [left, setLeft] = useState(resume?.settings.layout.columnWidth.left);
  const [right, setRight] = useState(resume?.settings.layout.columnWidth.right);

  useEffect(() => {
    const updateColumnWidth = (left: number, right: number) => {
      return updateSettings({
        variables: {
          id: resume?.settings.id,
          layout: { columnWidth: { left, right } },
        },
      });
    };
    left && right && updateColumnWidth(left, right);
  }, [left, right, resume?.settings.id, updateSettings]);

  return (
    <div>
      <h5>Column width</h5>
      <div className={style.columnWidth}>
        <div className={style.columnWidth_options}>
          <p>Left {left}%</p>
          <div
            className={style.columnWidth_options_box}
            onClick={() => {
              left && setLeft(left + 1);
              right && setRight(right - 1);
            }}
          >
            +
          </div>
        </div>
        <div className={style.columnWidth_options}>
          <p>Right {right}%</p>
          <div
            className={style.columnWidth_options_box}
            onClick={() => {
              right && setRight(right + 1);
              left && setLeft(left - 1);
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnWidth;
