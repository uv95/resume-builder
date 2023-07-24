import { useColorsContext } from '@/context/settings';
import useUpdateColors from '@/hooks/settings/useUpdateColors';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import BasicMulticolorIcon from './BasicMulticolorIcon';
import style from './Colors.module.scss';

const BasicOptions = () => {
    const {t} = useTranslation(['customization'])

    const { colors } = useColorsContext();
    const selected = colors?.basic.selected;
    const { accent, multicolor: selectedMulticolor } =
    colors?.basic!;
    const { selectOption } = useUpdateColors();

    return (
        <div className="flex">
            <div
                className={style.option}
                onClick={() => selectOption(ColorOption.ACCENT, Mode.BASIC)}
            >
                <div
                    className={`${style.option_accent} ${
                        selected === ColorOption.ACCENT ? style.option__selected : ''
                    }`}
                    style={{ background: accent }}
                ></div>
                <p>{t('accent')}</p>
            </div>
            <div
                className={style.option}
                onClick={() => selectOption(ColorOption.MULTICOLOR, Mode.BASIC)}
            >
                <BasicMulticolorIcon
                    optionSelected={selected === 'multicolor'}
                    color={selectedMulticolor}
                    isOption
                />
                <p>{t('multicolor')}</p>
            </div>
        </div>
    );
};

export default memo(BasicOptions);
