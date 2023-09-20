import { useColorsContext } from '@/context/settings';
import { UPDATE_COLORS } from '@/graphql/mutations/settings/colors';
import { applyAccentColor } from '@/utils/consts/colors';
import { removeTypename } from '@/utils/removeTypename/removeTypename';
import { IApplyAccentColor } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect, useState } from 'react';
import Section from '../shared/Section';
import style from './Colors.module.scss';

const ApplyAccentColor = () => {
    const {t} = useTranslation(['customization'])
    
    const { colors } = useColorsContext();
    const [applyAccentColorFields, setApplyAccentColorFields] = useState(
   colors?.applyAccentColor!
    );
    const [updateColors] = useMutation(UPDATE_COLORS);

    useEffect(() => {
        const updateApplyAccentColor = (applyAccentColor: IApplyAccentColor) => {
            return updateColors({
                variables: {
                    id: colors?.id,
                    ...removeTypename(colors!),
                    applyAccentColor: removeTypename(applyAccentColor),
                },
            });
        };
        updateApplyAccentColor(applyAccentColorFields);
    }, [
        applyAccentColorFields,
        colors?.id,
        colors,
        updateColors,
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

export default memo(ApplyAccentColor);
