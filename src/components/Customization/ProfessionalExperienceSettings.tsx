import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../UI/Button/Button';
import SettingsCard from './UI/SettingsCard';
import { useTranslation } from 'next-i18next';

const ProfessionalExperienceSettings = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { jobTitleFirst } =settings?.professionalExperience!;

    const { updateProfExperienceSettings } = useUpdateSettings();

    return (
        <SettingsCard title={t('professional-experience')}>
            <div className="flex">
                <Button
                    btnType="customization"
                    isActive={jobTitleFirst}
                    onClick={() => updateProfExperienceSettings({ jobTitleFirst: true })}
                >
                    {t('job-title')} - {t('employer')}
                </Button>
                <Button
                    btnType="customization"
                    isActive={!jobTitleFirst}
                    onClick={() => updateProfExperienceSettings({ jobTitleFirst: false })}
                >
                    {t('employer')} - {t('job-title')}
                </Button>
            </div>
        </SettingsCard>
    );
};

export default ProfessionalExperienceSettings;
