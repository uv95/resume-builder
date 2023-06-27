import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import SettingsCard from './UI/SettingsCard';
import { useTranslation } from 'next-i18next';

const ProfileSettings = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { showHeading } = settings?.profile!;
    const { updateProfileSettings } = useUpdateSettings();

    return (
        <SettingsCard title={t('profile')}>
            <div className="checkboxGroup">
                <input
                    type="checkbox"
                    id="showHeading"
                    checked={showHeading}
                    onChange={() => updateProfileSettings({ showHeading: !showHeading })}
                    className="checkboxInput"
                />
                <label htmlFor="showHeading">{t('show-heading')}</label>
            </div>
        </SettingsCard>
    );
};

export default ProfileSettings;
