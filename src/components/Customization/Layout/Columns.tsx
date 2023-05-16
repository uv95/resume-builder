import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settingsMutations';
import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import style from './Layout.module.scss';

type Props = {};

const Columns = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const [updateSettings] = useMutation(UPDATE_SETTINGS);

  const updateColumns = (columns: number) => {
    return updateSettings({
      variables: { id: resume?.settings.id, layout: { columns } },
    });
  };

  return (
    <div>
      <h5 className="mb-1">Columns</h5>
      <div className="flex">
        {resume?.settings.layout.position === 'top' && (
          <div
            className={`${
              resume?.settings.layout.columns === 1
                ? style.columns_active
                : style.columns
            }`}
            onClick={() => updateColumns(1)}
          >
            <div className={style.columns_container__one}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={style.line}></div>
              ))}
            </div>
          </div>
        )}
        <div
          className={`${
            resume?.settings.layout.columns === 2
              ? style.columns_active
              : style.columns
          }`}
          onClick={() => updateColumns(2)}
        >
          <div className={style.columns_container__two}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={style.line}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Columns;
