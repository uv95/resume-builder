import Card from '@/components/Card/Card';
import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import AdvancedOptions from './AdvancedOptions';
import ApplyAccentColor from './ApplyAccentColor';
import AccentColors from './AccentColors';
import BasicMulticolor from './BasicMulticolor';
import BasicOptions from './BasicOptions';
import style from './Colors.module.scss';
import Mode from './Mode';
import AdvancedMulticolor from './AdvancedMulticolor';

type Props = {};

const Colors = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const mode = resume?.settings.colors.mode;
  const selectedOptionBasic = resume?.settings.colors.basic.selected;
  const selectedOptionAdvanced = resume?.settings.colors.advanced.selected;

  return (
    <Card>
      <div className="p-2">
        <h3>Colors</h3>
        <div className="flex-column mt-2">
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
        </div>
      </div>
    </Card>
  );
};

export default Colors;
