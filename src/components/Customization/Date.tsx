import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import React, { useContext, useState } from 'react';
import SettingsButtons from './UI/SettingsButtons';
import SettingsCard from './UI/SettingsCard';

const Date = () => {
  const { resume } = useContext(ResumeContext);

  const { updateDate } = useUpdateSettings();
  const [values, setValues] = useState(removeTypename(resume?.settings.date!));
  const update = (updatedField: 'month' | 'delimiter', newVal: string) => {
    let delimiter: any;

    switch (
      updatedField === 'month' ? resume?.settings.date.delimiter : newVal
    ) {
      case '/ Slash':
        updatedField === 'month' ? (delimiter = 'slash') : (newVal = 'slash');
        break;
      case '- Hyphen':
        updatedField === 'month' ? (delimiter = 'hyphen') : (newVal = 'hyphen');

        break;
      case '. Dot':
        updatedField === 'month' ? (delimiter = 'dot') : (newVal = 'dot');
    }

    if (updatedField === 'month') {
      updateDate({
        delimiter,
        month: newVal as 'digits' | 'short' | 'long',
      });
    } else {
      updateDate({
        ...values,
        [updatedField]: newVal,
      });
    }
  };

  return (
    <SettingsCard title="Date">
      <SettingsButtons
        options={['digits', 'short', 'long']}
        updatedField="month"
        allValues={values}
        setValues={setValues}
        update={update}
      />
      {values.month === 'digits' && (
        <SettingsButtons
          options={['/ Slash', '- Hyphen', '. Dot']}
          updatedField="delimiter"
          allValues={values}
          setValues={setValues}
          update={update}
        />
      )}
    </SettingsCard>
  );
};

export default Date;
