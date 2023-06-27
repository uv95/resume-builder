import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import { FontStyle, Size } from '@/utils/types/settingsTypes';
import React, { useContext, useState } from 'react';
import SettingsButtons from './UI/SettingsButtons';
import SettingsCard from './UI/SettingsCard';
import { useTranslation } from 'next-i18next';

const Name = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);

    const { updateName } = useUpdateSettings();
    const [values, setValues] = useState(removeTypename(settings?.name!));
    const update = (updatedField: 'size' | 'style', newVal: string) =>
        updateName({
            ...values,
            [updatedField]: newVal,
        });
    return (
        <SettingsCard title={t('name')}>
            <SettingsButtons
                options={Object.values(Size)}
                updatedField="size"
                allValues={values}
                setValues={setValues}
                update={update}
            />
            <SettingsButtons
                options={[FontStyle.NORMAL, FontStyle.BOLD]}
                updatedField="style"
                allValues={values}
                setValues={setValues}
                update={update}
            />
        </SettingsCard>
    );
};

export default Name;
