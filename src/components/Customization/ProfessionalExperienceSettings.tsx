import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../Button/Button';
import SettingsCard from './UI/SettingsCard';

const ProfessionalExperienceSettings = () => {
  const { resume } = useContext(ResumeContext);
  const { jobTitleFirst } = resume?.settings.professionalExperience!;

  const { updateProfExperienceSettings } = useUpdateSettings();

  return (
    <SettingsCard title="Professional Experience">
      <div className="flex">
        <Button
          btnType="customization"
          isActive={jobTitleFirst}
          onClick={() => updateProfExperienceSettings({ jobTitleFirst: true })}
        >
          Job Title - Employer
        </Button>
        <Button
          btnType="customization"
          isActive={!jobTitleFirst}
          onClick={() => updateProfExperienceSettings({ jobTitleFirst: false })}
        >
          Employer - Job Title
        </Button>
      </div>
    </SettingsCard>
  );
};

export default ProfessionalExperienceSettings;
