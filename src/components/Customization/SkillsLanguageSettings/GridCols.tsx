import Button from '@/components/Button/Button';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ISkillsLanguageSettings } from '@/utils/types';
import React from 'react';
import style from './SkillsLanguageSettings.module.scss';

type Props = {
  setValues: React.Dispatch<ISkillsLanguageSettings>;
  values: ISkillsLanguageSettings;
  section: 'skills' | 'language';
};

const GridCols = ({ setValues, values, section }: Props) => {
  const { updateSkillsSettings, updateLanguageSettings } = useUpdateSettings();

  return (
    <div className="flex">
      {['one', 'two', 'three', 'four'].map((col, i) => (
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
              gridCols: col as ISkillsLanguageSettings['gridCols'],
            });
            section === 'language'
              ? updateLanguageSettings({
                  ...values,
                  gridCols: col as ISkillsLanguageSettings['gridCols'],
                })
              : updateSkillsSettings({
                  ...values,
                  gridCols: col as ISkillsLanguageSettings['gridCols'],
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

export default GridCols;
