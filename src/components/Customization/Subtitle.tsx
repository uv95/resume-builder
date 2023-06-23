import React, { useContext, useState } from 'react';
import SettingsCard from './UI/SettingsCard';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from './UI/SettingsButtons';
import { FontStyle, SubtitlePosition } from '@/utils/types/settingsTypes';

const Subtitle = () => {
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
        <SettingsCard title="Subtitle">
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
