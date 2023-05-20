import Button from '@/components/Button/Button';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React from 'react';
import style from './Spacing.module.scss';
import Track from './Track';

type Props = {
  sectionTitle: string;
  sectionName:
    | 'fontSize'
    | 'lineHeight'
    | 'leftRightMargin'
    | 'topBottomMargin'
    | 'spaceBetweenSections';
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
            text="-"
            color="whiteWithBorder"
            onClick={() =>
              values.indexOf(currentValue) !== 0 &&
              updateSpacing(
                sectionName,
                values[values.indexOf(currentValue) - 1]
              )
            }
          />
          <Button
            text="+"
            color="whiteWithBorder"
            onClick={() =>
              values.indexOf(currentValue) !== 8 &&
              updateSpacing(
                sectionName,
                values[values.indexOf(currentValue) + 1]
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Bar;
