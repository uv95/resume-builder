import { ResumeContext } from '@/context/ResumeContext';
import React, { memo, useContext } from 'react';
import style from './Colors.module.scss';
import BasicMulticolorIcon from './BasicMulticolorIcon';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import { useColorsContext } from '@/context/ColorsContext';
import useUpdateColors from '@/hooks/settings/useUpdateColors';

const BasicOptions = () => {
    const {t} = useTranslation(['customization'])

    // const { settings } = useContext(ResumeContext);
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
