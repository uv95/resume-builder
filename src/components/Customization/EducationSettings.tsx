import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../Button/Button';
import SettingsCard from './UI/SettingsCard';

const EducationSettings = () => {
    const { resume } = useContext(ResumeContext);
    const { degreeFirst } = resume?.settings.education!;

    const { updateEducationSettings } = useUpdateSettings();

    return (
        <SettingsCard title="Education">
            <div className="flex">
                <Button
                    btnType="customization"
                    isActive={degreeFirst}
                    onClick={() => updateEducationSettings({ degreeFirst: true })}
                >
                    Degree - School
                </Button>
                <Button
                    btnType="customization"
                    isActive={!degreeFirst}
                    onClick={() => updateEducationSettings({ degreeFirst: false })}
                >
                    School - Degree
                </Button>
            </div>
        </SettingsCard>
    );
};

export default EducationSettings;
