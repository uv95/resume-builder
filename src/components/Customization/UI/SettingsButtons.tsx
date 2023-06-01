import { camelCaseToString } from '@/utils/camelCaseToString';
import React from 'react';
import Button from '../../Button/Button';
import Section from './Section';

type Props = {
  options: string[];
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
  setValues,
}: Props) => {
  return (
    <Section title={updatedField[0].toUpperCase() + updatedField.slice(1)}>
      <div className="flex">
        {options.map((item: any) => (
          <Button
            key={item}
            type="customization"
            active={allValues[updatedField] === item}
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
    </Section>
  );
};

export default SettingsButtons;
