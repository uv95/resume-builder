import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { applyAccentColor } from '@/utils/colors';
import { removeTypename } from '@/utils/removeTypename';
import { IApplyAccentColor } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import Section from '../UI/Section';
import style from './Colors.module.scss';

const ApplyAccentColor = () => {
    const { resume } = useContext(ResumeContext);
    const [applyAccentColorFields, setApplyAccentColorFields] = useState(
    resume?.settings.colors.applyAccentColor!
    );
    const [updateSettings] = useMutation(UPDATE_SETTINGS);

    useEffect(() => {
        const updateApplyAccentColor = (applyAccentColor: IApplyAccentColor) => {
            return updateSettings({
                variables: {
                    id: resume?.settings.id,
                    colors: {
                        ...removeTypename(resume?.settings.colors!),
                        applyAccentColor: removeTypename(applyAccentColor),
                    },
                },
            });
        };
        updateApplyAccentColor(applyAccentColorFields);
    }, [
        applyAccentColorFields,
        resume?.settings.id,
        resume?.settings.colors,
        updateSettings,
    ]);
    return (
        <Section title="Apply accent color">
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
                        <label htmlFor={option.name}>{option.label}</label>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ApplyAccentColor;
