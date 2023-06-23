import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import SettingsCard from './UI/SettingsCard';

const ProfileSettings = () => {
    const { settings } = useContext(ResumeContext);
    const { showHeading } = settings?.profile!;
    const { updateProfileSettings } = useUpdateSettings();

    return (
        <SettingsCard title="Profile">
            <div className="checkboxGroup">
                <input
                    type="checkbox"
                    id="showHeading"
                    checked={showHeading}
                    onChange={() => updateProfileSettings({ showHeading: !showHeading })}
                    className="checkboxInput"
                />
                <label htmlFor="showHeading">Show Heading</label>
            </div>
        </SettingsCard>
    );
};

export default ProfileSettings;
