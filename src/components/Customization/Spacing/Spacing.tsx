import { ResumeContext } from '@/context/ResumeContext';
import { spacingData } from '@/utils/spacing';
import React, { useContext } from 'react';
import SettingsCard from '../UI/SettingsCard';
import Bar from './Bar';

const Spacing = () => {
  const { resume } = useContext(ResumeContext);
  const spacing = resume?.settings.spacing!;
  return (
    <SettingsCard title="Spacing">
      {spacingData.map((item) => (
        <Bar
          key={item.name}
          sectionTitle={item.title}
          sectionName={item.name}
          currentValue={spacing[item.name as keyof typeof spacing]}
          values={item.values}
        />
      ))}
    </SettingsCard>
  );
};

export default Spacing;
