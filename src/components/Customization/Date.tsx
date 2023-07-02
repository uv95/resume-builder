import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import { Delimiter, Month } from '@/utils/types/settingsTypes';
import React, { useContext, useState } from 'react';
import SettingsButtons from './shared/SettingsButtons';
import SettingsCard from './shared/SettingsCard';
import { useTranslation } from 'next-i18next';

const Date = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);

    const { updateDate } = useUpdateSettings();
    const [values, setValues] = useState(removeTypename(settings?.date!));
    const update = (updatedField: 'month' | 'delimiter', newVal: string) => {
        let delimiter: any;

        switch (
            updatedField === 'month' ? settings?.date.delimiter : newVal
        ) {
        case Delimiter.SLASH:
            updatedField === 'month' ? (delimiter = 'slash') : (newVal = 'slash');
            break;
        case Delimiter.HYPHEN:
            updatedField === 'month' ? (delimiter = 'hyphen') : (newVal = 'hyphen');

            break;
        case Delimiter.DOT:
            updatedField === 'month' ? (delimiter = 'dot') : (newVal = 'dot');
        }

        if (updatedField === 'month') {
            updateDate({
                delimiter,
                month: newVal as Month,
            });
        } else {
            updateDate({
                ...values,
                [updatedField]: newVal,
            });
        }
    };

    return (
        <SettingsCard title={t('date')}>
            <SettingsButtons
                options={Object.values(Month)}
                updatedField="month"
                allValues={values}
                setValues={setValues}
                update={update}
            />
            {values.month === 'digits' && (
                <SettingsButtons
                    options={Object.values(Delimiter)}
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
