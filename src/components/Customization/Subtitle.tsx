import React, { useContext, useState } from 'react';
import SettingsCard from './UI/SettingsCard';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from './UI/SettingsButtons';

const Subtitle = () => {
  const { resume } = useContext(ResumeContext);
  const { updateSubtitle } = useUpdateSettings();
  const [values, setValues] = useState(
    removeTypename(resume?.settings.subtitle!)
  );
  const update = (updatedField: 'position' | 'style', newVal: string) =>
    updateSubtitle({
      ...values,
      [updatedField]: newVal,
    });

  return (
    <SettingsCard title="Subtitle">
      <SettingsButtons
        options={['normal', 'bold', 'italic']}
        updatedField="style"
        allValues={values}
        setValues={setValues}
        update={update}
      />
      <SettingsButtons
        options={['sameLine', 'nextLine']}
        updatedField="position"
        allValues={values}
        setValues={setValues}
        update={update}
      />
    </SettingsCard>
  );
};

export default Subtitle;
