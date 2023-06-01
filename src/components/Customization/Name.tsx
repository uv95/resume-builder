import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import React, { useContext, useState } from 'react';
import SettingsButtons from './UI/SettingsButtons';
import SettingsCard from './UI/SettingsCard';

const Name = () => {
  const { resume } = useContext(ResumeContext);

  const { updateName } = useUpdateSettings();
  const [values, setValues] = useState(removeTypename(resume?.settings.name!));
  const update = (updatedField: 'size' | 'style', newVal: string) =>
    updateName({
      ...values,
      [updatedField]: newVal,
    });
  return (
    <SettingsCard title="Name">
      <SettingsButtons
        options={['s', 'm', 'l']}
        updatedField="size"
        allValues={values}
        setValues={setValues}
        update={update}
      />
      <SettingsButtons
        options={['normal', 'bold']}
        updatedField="style"
        allValues={values}
        setValues={setValues}
        update={update}
      />
    </SettingsCard>
  );
};

export default Name;
