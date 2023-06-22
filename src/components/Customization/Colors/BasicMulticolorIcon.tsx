import useUpdateSettings from '@/hooks/useUpdateSettings';
import { IBasicMulticolor, Mode } from '@/utils/types/settingsTypes';
import React from 'react';
import style from './Colors.module.scss';

type Props = {
  color: IBasicMulticolor;
  optionSelected?: boolean;
  isOption?: boolean;
};

const BasicMulticolorIcon = ({ color, optionSelected, isOption }: Props) => {
    const { updateMulticolor } = useUpdateSettings();

    return (
        <div
            className={style.multicolorIcon}
            onClick={() => !isOption && updateMulticolor(color, Mode.BASIC)}
        >
            <div
                className={`${style.option_multicolor} ${
                    optionSelected
                        ? style.option__selected
                        : isOption
                            ? style.option__notSelected
                            : ''
                }`}
            >
                <div
                    className={style.option_multicolor__left}
                    style={{ background: color?.background }}
                >
                    <p style={{ color: color?.font }}>T</p>
                    <div
                        className={style.line}
                        style={{ background: color?.accent }}
                    ></div>
                </div>
                <div
                    className={style.option_multicolor__right}
                    style={{ background: color?.accent }}
                ></div>
            </div>
            {optionSelected && !isOption && <div className={style.underline}></div>}
        </div>
    );
};

export default BasicMulticolorIcon;
