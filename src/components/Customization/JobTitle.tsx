import React, { useContext, useState } from 'react';
import SettingsCard from './UI/SettingsCard';
import SettingsButtons from './UI/SettingsButtons';
import { ResumeContext } from '@/context/ResumeContext';
import { removeTypename } from '@/utils/removeTypename';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { FontStyle, Size } from '@/utils/types/settingsTypes';

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
                options={Object.values(Size)}
                updatedField="size"
                allValues={values}
                setValues={setValues}
                update={update}
            />
            <SettingsButtons
                options={Object.values(FontStyle)}
                updatedField="style"
                allValues={values}
                setValues={setValues}
                update={update}
            />
        </SettingsCard>
    );
};

export default JobTitle;
