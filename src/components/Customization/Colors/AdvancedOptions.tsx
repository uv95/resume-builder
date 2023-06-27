import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import AdvancedMulticolorIcon from './AdvancedMulticolorIcon';
import style from './Colors.module.scss';
import { useTranslation } from 'next-i18next';

const AdvancedOptions = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { selectOption } = useUpdateSettings();
    const selected = settings?.colors.advanced.selected;
    const { accent, multicolor: selectedMulticolor } =
    settings?.colors.advanced!;

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

export default AdvancedOptions;
