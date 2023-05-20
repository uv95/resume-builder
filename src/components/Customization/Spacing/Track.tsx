import { FetchResult } from '@apollo/client';
import React from 'react';
import style from './Spacing.module.scss';

type Props = {
  sectionName:
    | 'fontSize'
    | 'lineHeight'
    | 'leftRightMargin'
    | 'topBottomMargin'
    | 'spaceBetweenSections';
  currentValue: number;
  values: number[];
  updateSpacing: (
    section:
      | 'fontSize'
      | 'lineHeight'
      | 'leftRightMargin'
      | 'topBottomMargin'
      | 'spaceBetweenSections',
    value: number
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
};

const Track = ({ values, sectionName, currentValue, updateSpacing }: Props) => {
  const getCellPosition = (i: number) => {
    if (i === 0) return i * (100 / 9);
    if (i === 8) return i * (100 / 9) + 0.3;

    return i * (100 / 9) + 0.3;
  };
  return (
    <div className={style.track}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={style.divider}
          style={{ left: `${(i + 1) * (100 / 9)}%` }}
        ></div>
      ))}
      {values.map((val, i) => (
        <div
          key={val}
          className={style.cell}
          style={{
            left: `${getCellPosition(i)}%`,
            width: `${100 / 9 - (i === 0 || i === 8 ? 0 : 0.4)}%`,
          }}
          onClick={() => updateSpacing(sectionName, val)}
        ></div>
      ))}
      <div
        className={style.thumb}
        style={{ left: (100 / 9) * values.indexOf(currentValue) + '%' }}
      ></div>
    </div>
  );
};

export default Track;
