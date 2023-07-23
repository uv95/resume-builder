import { useColorsContext } from '@/context/ColorsContext';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import SettingsCard from '../shared/SettingsCard';
import AccentColors from './AccentColors';
import AdvancedMulticolor from './AdvancedMulticolor';
import AdvancedOptions from './AdvancedOptions';
import ApplyAccentColor from './ApplyAccentColor';
import BasicMulticolor from './BasicMulticolor';
import BasicOptions from './BasicOptions';
import ModeComponent from './ModeComponent';

const Colors = () => {
    const {t} = useTranslation(['customization'])

    const { colors } = useColorsContext();
    const mode = colors?.mode;
    const selectedOptionBasic = colors?.basic.selected;
    const selectedOptionAdvanced = colors?.advanced.selected;

    return (
        <SettingsCard title={t('colors')}>
            <ModeComponent />
            {mode === Mode.BASIC ? (
                <>
                    <BasicOptions />
                    {selectedOptionBasic === ColorOption.ACCENT ? (
                        <AccentColors />
                    ) : (
                        <BasicMulticolor />
                    )}
                </>
            ) : (
                <>
                    <AdvancedOptions />
                    {selectedOptionAdvanced === ColorOption.ACCENT ? (
                        <AccentColors />
                    ) : (
                        <AdvancedMulticolor />
                    )}
                </>
            )}
            <ApplyAccentColor />
        </SettingsCard>
    );
};

export default memo(Colors);
