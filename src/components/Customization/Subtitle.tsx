import { useSubtitleContext } from '@/context/settings';
import useUpdateSubtitle from '@/hooks/settings/useUpdateSubtitle';
import { removeTypename } from '@/utils/removeTypename/removeTypename';
import { FontStyle, SubtitlePosition } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import SettingsButtons from './shared/SettingsButtons';
import SettingsCard from './shared/SettingsCard';

const Subtitle = () => {
    const {t} = useTranslation(['customization'])

    const {subtitle} = useSubtitleContext();
    const updateSubtitle = useUpdateSubtitle();
    const [values, setValues] = useState(
        removeTypename(subtitle!)
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
