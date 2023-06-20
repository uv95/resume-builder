import { camelCaseToString } from '@/utils/camelCaseToString';
import React from 'react';
import Button from '../../Button/Button';

type Props = {
  options: string[];
  hasNoTitle?: boolean;
  title?: string;
  updatedField: string;
  allValues: any;
  update: any;
  setValues: React.Dispatch<any>;
};

const SettingsButtons = ({
  update,
  options,
  updatedField,
  allValues,
  hasNoTitle,
  title,
  setValues,
}: Props) => {
  return (
    <div>
      {!hasNoTitle && (
        <h5 style={{ marginBottom: '1rem' }}>
          {title || updatedField[0].toUpperCase() + updatedField.slice(1)}
        </h5>
      )}
      <div className="flex">
        {options.map((item: any) => (
          <Button
            key={item}
            btnType="customization"
            isActive={allValues[updatedField] === item}
            onClick={() => {
              setValues({ ...allValues, [updatedField]: item });
              update(updatedField, item);
            }}
          >
            <p
              style={{
                fontWeight: item === 'bold' ? 'bold' : 'normal',
                fontStyle: item === 'italic' ? 'italic' : 'normal',
                minWidth: updatedField !== 'size' ? '6rem' : 0,
              }}
            >
              {camelCaseToString(item)}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SettingsButtons;
