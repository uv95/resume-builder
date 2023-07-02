import useUpdateSettings from '@/hooks/useUpdateSettings';
import { IAdvancedMulticolor, Mode } from '@/utils/types/settingsTypes';
import React from 'react';
import style from './Colors.module.scss';

type Props = {
  color: IAdvancedMulticolor;
  optionSelected?: boolean;
  colorSelected?: boolean;
  isOption?: boolean;
};

const AdvancedMulticolorIcon = ({ color, optionSelected, isOption }: Props) => {
    const { updateMulticolor } = useUpdateSettings();

    return (
        <div
            className={style.multicolorIcon}
            onClick={() => !isOption && updateMulticolor(color, Mode.ADVANCED)}
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
                    style={{ background: color?.primary.background }}
                >
                    <p style={{ color: color?.primary.font }}>T</p>
                    <div
                        className={style.line}
                        style={{ background: color?.primary.accent }}
                    ></div>
                </div>
                <div
                    className={style.option_multicolor__right}
                    style={{ background: color?.secondary.background }}
                >
                    <p style={{ color: color?.secondary.font }}>T</p>
                    <div
                        className={style.line}
                        style={{ background: color?.secondary.accent }}
                    ></div>
                </div>
            </div>
            {optionSelected && !isOption && <div className={style.underline}></div>}
        </div>
    );
};

export default AdvancedMulticolorIcon;
