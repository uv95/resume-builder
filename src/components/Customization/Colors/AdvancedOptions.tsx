import { useColorsContext } from '@/context/settings';
import useUpdateColors from '@/hooks/settings/useUpdateColors';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import AdvancedMulticolorIcon from './AdvancedMulticolorIcon';
import style from './Colors.module.scss';

const AdvancedOptions = () => {
    const {t} = useTranslation(['customization'])

    const { selectOption } = useUpdateColors();
    const { colors } = useColorsContext();

    const selected =colors?.advanced.selected;
    const { accent, multicolor: selectedMulticolor } =
  colors?.advanced!;

    return (
        <div className="flex">
            <div
                className={style.option}
                onClick={() => selectOption(ColorOption.ACCENT, Mode.ADVANCED)}
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
                onClick={() => selectOption(ColorOption.MULTICOLOR, Mode.ADVANCED)}
            >
                <AdvancedMulticolorIcon
                    optionSelected={selected === ColorOption.MULTICOLOR}
                    color={selectedMulticolor}
                    isOption
                />
                <p>{t('multicolor')}</p>
            </div>
        </div>
    );
};

export default memo(AdvancedOptions);
