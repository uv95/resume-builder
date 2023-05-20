import { ResumeContext } from '@/context/ResumeContext';
import { spacingData } from '@/utils/spacing';
import React, { useContext } from 'react';
import SettingsCard from '../SettingsCard';
import Bar from './Bar';

type Props = {};

const Spacing = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const spacing = resume?.settings.spacing!;
  return (
    <SettingsCard title="Spacing">
      {spacingData.map((item) => (
        <Bar
          key={item.name}
          sectionTitle={item.title}
          sectionName={
            item.name as
              | 'fontSize'
              | 'lineHeight'
              | 'leftRightMargin'
              | 'topBottomMargin'
              | 'spaceBetweenSections'
          }
          currentValue={spacing[item.name as keyof typeof spacing]}
          values={item.values}
        />
      ))}
    </SettingsCard>
  );
};

export default Spacing;
