import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import AdvancedOptions from './AdvancedOptions';
import ApplyAccentColor from './ApplyAccentColor';
import AccentColors from './AccentColors';
import BasicMulticolor from './BasicMulticolor';
import BasicOptions from './BasicOptions';
import ModeComponent from './ModeComponent';
import AdvancedMulticolor from './AdvancedMulticolor';
import SettingsCard from '../UI/SettingsCard';
import { ColorOption, Mode } from '@/utils/types/settingsTypes';

const Colors = () => {
    const { resume } = useContext(ResumeContext);
    const mode = resume?.settings.colors.mode;
    const selectedOptionBasic = resume?.settings.colors.basic.selected;
    const selectedOptionAdvanced = resume?.settings.colors.advanced.selected;

    return (
        <SettingsCard title="Colors">
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

export default Colors;
