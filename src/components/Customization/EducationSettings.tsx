import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../UI/Button/Button';
import SettingsCard from './UI/SettingsCard';
import { useTranslation } from 'next-i18next';

const EducationSettings = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { degreeFirst } = settings?.education!;

    const { updateEducationSettings } = useUpdateSettings();

    return (
        <SettingsCard title={t('education')}>
            <div className="flex">
                <Button
                    btnType="customization"
                    isActive={degreeFirst}
                    onClick={() => updateEducationSettings({ degreeFirst: true })}
                >
                    {t('degree')} - {t('school')}
                </Button>
                <Button
                    btnType="customization"
                    isActive={!degreeFirst}
                    onClick={() => updateEducationSettings({ degreeFirst: false })}
                >
                    {t('school')} - {t('degree')}
                </Button>
            </div>
        </SettingsCard>
    );
};

export default EducationSettings;
