import React, { useContext, useState } from 'react';
import SettingsCard from './shared/SettingsCard';
import SettingsButtons from './shared/SettingsButtons';
import { ResumeContext } from '@/context/ResumeContext';
import { removeTypename } from '@/utils/removeTypename/removeTypename';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { FontStyle, Size } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';

const JobTitle = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { updateJobTitle } = useUpdateSettings();

    const [values, setValues] = useState(
        removeTypename(settings?.jobTitle!)
    );
    const update = (updatedField: 'size' | 'style', newVal: string) =>
        updateJobTitle({
            ...values,
            [updatedField]: newVal,
        });

    return (
        <SettingsCard title={t('job-title')}>
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
