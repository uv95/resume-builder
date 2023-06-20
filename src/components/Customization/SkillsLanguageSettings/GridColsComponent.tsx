import Button from '@/components/Button/Button';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { GridCols, ISkillsLanguageSettings } from '@/utils/types/settingsTypes';
import React from 'react';
import style from './SkillsLanguageSettings.module.scss';

type Props = {
  setValues: React.Dispatch<ISkillsLanguageSettings>;
  values: ISkillsLanguageSettings;
  section: 'skills' | 'language';
};

const GridColsComponent = ({ setValues, values, section }: Props) => {
  const { updateSkillsSettings, updateLanguageSettings } = useUpdateSettings();

  return (
    <div className="flex">
      {Object.values(GridCols).map((col, i) => (
        <Button
          key={col}
          classes={`${style.button} ${
            values.gridCols === col ? style.button_active : ''
          }`}
          type="customization"
          active={values.gridCols === col}
          onClick={() => {
            setValues({
              ...values,
              gridCols: col,
            });
            section === 'language'
              ? updateLanguageSettings({
                  ...values,
                  gridCols: col,
                })
              : updateSkillsSettings({
                  ...values,
                  gridCols: col,
                });
          }}
        >
          <div className={style.itemContainer}>
            {[...Array(i + 1)].map((_, index) => (
              <div key={index} className={style.item}></div>
            ))}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default GridColsComponent;
