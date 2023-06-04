import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../Button/Button';
import SettingsCard from './UI/SettingsCard';

type Props = {};

const EducationSettings = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const { degreeFirst } = resume?.settings.education!;

  const { updateEducationSettings } = useUpdateSettings();

  return (
    <SettingsCard title="Education">
      <div className="flex">
        <Button
          type="customization"
          active={degreeFirst}
          onClick={() => updateEducationSettings({ degreeFirst: true })}
        >
          Degree - School
        </Button>
        <Button
          type="customization"
          active={!degreeFirst}
          onClick={() => updateEducationSettings({ degreeFirst: false })}
        >
          School - Degree
        </Button>
      </div>
    </SettingsCard>
  );
};

export default EducationSettings;
