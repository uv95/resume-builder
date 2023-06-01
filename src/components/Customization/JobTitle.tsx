import React, { useContext, useState } from 'react';
import SettingsCard from './UI/SettingsCard';
import SettingsButtons from './UI/SettingsButtons';
import { ResumeContext } from '@/context/ResumeContext';
import { removeTypename } from '@/utils/removeTypename';
import useUpdateSettings from '@/hooks/useUpdateSettings';

const JobTitle = () => {
  const { resume } = useContext(ResumeContext);
  const { updateJobTitle } = useUpdateSettings();

  const [values, setValues] = useState(
    removeTypename(resume?.settings.jobTitle!)
  );
  const update = (updatedField: 'size' | 'style', newVal: string) =>
    updateJobTitle({
      ...values,
      [updatedField]: newVal,
    });

  return (
    <SettingsCard title="Job Title">
      <SettingsButtons
        options={['s', 'm', 'l']}
        updatedField="size"
        allValues={values}
        setValues={setValues}
        update={update}
      />
      <SettingsButtons
        options={['normal', 'bold', 'italic']}
        updatedField="style"
        allValues={values}
        setValues={setValues}
        update={update}
      />
    </SettingsCard>
  );
};

export default JobTitle;
