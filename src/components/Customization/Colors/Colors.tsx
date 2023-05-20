import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import AdvancedOptions from './AdvancedOptions';
import ApplyAccentColor from './ApplyAccentColor';
import AccentColors from './AccentColors';
import BasicMulticolor from './BasicMulticolor';
import BasicOptions from './BasicOptions';
import Mode from './Mode';
import AdvancedMulticolor from './AdvancedMulticolor';
import SettingsCard from '../SettingsCard';

const Colors = () => {
  const { resume } = useContext(ResumeContext);
  const mode = resume?.settings.colors.mode;
  const selectedOptionBasic = resume?.settings.colors.basic.selected;
  const selectedOptionAdvanced = resume?.settings.colors.advanced.selected;

  return (
    <SettingsCard title="Colors">
      <Mode />
      {mode === 'basic' ? (
        <>
          <BasicOptions />
          {selectedOptionBasic === 'accent' ? (
            <AccentColors />
          ) : (
            <BasicMulticolor />
          )}
        </>
      ) : (
        <>
          <AdvancedOptions />
          {selectedOptionAdvanced === 'accent' ? (
            <AccentColors />
          ) : (
            <AdvancedMulticolor />
          )}
        </>
      )}
      <ApplyAccentColor />
    </SettingsCard>
  );
};

export default Colors;
