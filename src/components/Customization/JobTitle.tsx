import React from 'react';
import SettingsCard from './UI/SettingsCard';
import Size from './Size';
import Style from './Style';

const JobTitle = () => {
  return (
    <SettingsCard title="Job Title">
      <Size section="jobTitle" />
      <Style section="jobTitle" />
    </SettingsCard>
  );
};

export default JobTitle;
