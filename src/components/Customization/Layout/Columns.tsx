import Button from '@/components/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import style from './Layout.module.scss';

const Columns = () => {
  const { resume } = useContext(ResumeContext);
  const { columns, position } = resume?.settings.layout!;
  const { updateColumns } = useUpdateSettings();

  return (
    <div>
      <h5 className="mb-1">Columns</h5>
      <div className="flex">
        {position === 'top' && (
          <Button
            btnType="customization"
            isActive={columns === 1}
            className={`${
              columns === 1 ? style.columns_active : style.columns
            }`}
            onClick={() => updateColumns(1)}
          >
            <div className={style.columns_container__one}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className={style.line}></div>
              ))}
            </div>
          </Button>
        )}
        <Button
          btnType="customization"
          isActive={columns === 2}
          className={`${columns === 2 ? style.columns_active : style.columns}`}
          onClick={() => updateColumns(2)}
        >
          <div className={style.columns_container__two}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={style.line}></div>
            ))}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Columns;
