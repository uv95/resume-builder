import React, { useContext, useState } from 'react';
import SettingsCard from './shared/SettingsCard';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from './shared/SettingsButtons';
import { FontStyle, SubtitlePosition } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';

const Subtitle = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { updateSubtitle } = useUpdateSettings();
    const [values, setValues] = useState(
        removeTypename(settings?.subtitle!)
    );
    const update = (updatedField: 'position' | 'style', newVal: string) =>
        updateSubtitle({
            ...values,
            [updatedField]: newVal,
        });

    return (
        <SettingsCard title={t('subtitle')}>
            <SettingsButtons
                options={Object.values(FontStyle)}
                updatedField="style"
                allValues={values}
                setValues={setValues}
                update={update}
            />
            <SettingsButtons
                options={Object.values(SubtitlePosition)}
                updatedField="position"
                allValues={values}
                setValues={setValues}
                update={update}
            />
        </SettingsCard>
    );
};

export default Subtitle;
