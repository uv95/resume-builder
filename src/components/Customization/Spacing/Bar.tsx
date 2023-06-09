import Button from '@/components/Button/Button';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { SpacingSectionsType } from '@/utils/types';
import React from 'react';
import style from './Spacing.module.scss';
import Track from './Track';

type Props = {
  sectionTitle: string;
  sectionName: SpacingSectionsType;
  currentValue: number;
  values: number[];
};

const Bar = ({ sectionTitle, sectionName, currentValue, values }: Props) => {
  const { updateSpacing } = useUpdateSettings();

  return (
    <div>
      <div className="flex spaceBetween">
        <h5>{sectionTitle}</h5>
        <p>
          {currentValue}
          {(sectionName === 'leftRightMargin' ||
            sectionName === 'topBottomMargin') &&
            'mm'}
        </p>
      </div>

      <div className={style.container}>
        <div className={style.bar}>
          <Track
            sectionName={sectionName}
            values={values}
            currentValue={currentValue}
            updateSpacing={updateSpacing}
          />
        </div>
        <div className={style.buttons}>
          <Button
            type="thickBorder"
            onClick={() =>
              values.indexOf(currentValue) !== 0 &&
              updateSpacing(
                sectionName,
                values[values.indexOf(currentValue) - 1]
              )
            }
          >
            -
          </Button>
          <Button
            type="thickBorder"
            onClick={() =>
              values.indexOf(currentValue) !== 8 &&
              updateSpacing(
                sectionName,
                values[values.indexOf(currentValue) + 1]
              )
            }
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bar;
