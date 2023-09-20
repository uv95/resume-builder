import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename/removeTypename';
import { Format, TextFormat } from '@/utils/types/settingsTypes';
import React, { useContext, useState } from 'react';
import Section from '../shared/Section';
import SettingsButtons from '../shared/SettingsButtons';
import SettingsCard from '../shared/SettingsCard';
import GridColsComponent from './GridColsComponent';
import { useTranslation } from 'next-i18next';

type Props = { section: 'skills' | 'language' };

const SkillsLanguageSettings = ({ section }: Props) => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const settingsSection = settings![section];
    const infoItalic = settingsSection?.infoItalic;
    const { updateLanguageSettings, updateSkillsSettings } = useUpdateSettings();
    const [values, setValues] = useState(
        removeTypename(settingsSection)
    );
    const update = (
        updatedField: 'format' | 'gridCols' | 'textFormat' | 'infoItalic',
        newVal: string
    ) =>
        section === 'language'
            ? updateLanguageSettings({
                ...values,
                [updatedField]: newVal,
            })
            : updateSkillsSettings({
                ...values,
                [updatedField]: newVal,
            });

    return (
        <SettingsCard title={t(section)}>
            <SettingsButtons
                options={Object.values(Format)}
                updatedField="format"
                allValues={values}
                setValues={setValues}
                update={update}
                hasNoTitle
            />
            {values.format === 'grid' && (
                <GridColsComponent
                    section={section}
                    setValues={setValues}
                    values={values}
                />
            )}
            {values.format === 'text' && (
                <SettingsButtons
                    options={Object.values(TextFormat)}
                    updatedField="textFormat"
                    allValues={values}
                    setValues={setValues}
                    update={update}
                    hasNoTitle
                />
            )}
            <Section title={t('info-style')}>
                <div className="checkboxGroup">
                    <input
                        type="checkbox"
                        id="infoItalic"
                        checked={infoItalic}
                        onChange={() => {
                            setValues({ ...values, infoItalic: !infoItalic });
                            section === 'language'
                                ? updateLanguageSettings({ ...values, infoItalic: !infoItalic })
                                : updateSkillsSettings({ ...values, infoItalic: !infoItalic });
                        }}
                        className="checkboxInput"
                    />
                    <label htmlFor="infoItalic">{t('italic')}</label>
                </div>
            </Section>
        </SettingsCard>
    );
};

export default SkillsLanguageSettings;
