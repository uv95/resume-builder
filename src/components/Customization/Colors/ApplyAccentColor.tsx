import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { applyAccentColor } from '@/utils/colors';
import { removeTypename } from '@/utils/removeTypename';
import { IApplyAccentColor } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import Section from '../shared/Section';
import style from './Colors.module.scss';
import { useTranslation } from 'next-i18next';

const ApplyAccentColor = () => {
    const {t} = useTranslation(['customization'])
    
    const { settings } = useContext(ResumeContext);
    const [applyAccentColorFields, setApplyAccentColorFields] = useState(
    settings?.colors.applyAccentColor!
    );
    const [updateSettings] = useMutation(UPDATE_SETTINGS);

    useEffect(() => {
        const updateApplyAccentColor = (applyAccentColor: IApplyAccentColor) => {
            return updateSettings({
                variables: {
                    id: settings?.id,
                    colors: {
                        ...removeTypename(settings?.colors!),
                        applyAccentColor: removeTypename(applyAccentColor),
                    },
                },
            });
        };
        updateApplyAccentColor(applyAccentColorFields);
    }, [
        applyAccentColorFields,
        settings?.id,
        settings?.colors,
        updateSettings,
    ]);
    return (
        <Section title={t('apply-accent')}>
            <div className={style.inputs}>
                {applyAccentColor.map((option) => (
                    <div key={option.name} className={style.checkboxGroup}>
                        <input
                            type="checkbox"
                            name={option.name}
                            id={option.name}
                            checked={
                                applyAccentColorFields[
                  option.name as keyof typeof applyAccentColorFields
                                ]
                            }
                            onChange={() =>
                                setApplyAccentColorFields({
                                    ...applyAccentColorFields,
                                    [option.name]:
                    !applyAccentColorFields[
                      option.name as keyof typeof applyAccentColorFields
                    ],
                                })
                            }
                            className={style.input}
                        />
                        <label htmlFor={option.name}>{t(option.name)}</label>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ApplyAccentColor;
