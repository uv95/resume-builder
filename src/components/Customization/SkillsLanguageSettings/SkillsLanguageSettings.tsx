import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { camelCaseToString } from '@/utils/camelCaseToString';
import { removeTypename } from '@/utils/removeTypename';
import { Format, TextFormat } from '@/utils/types/settingsTypes';
import React, { useContext, useState } from 'react';
import Section from '../UI/Section';
import SettingsButtons from '../UI/SettingsButtons';
import SettingsCard from '../UI/SettingsCard';
import GridColsComponent from './GridColsComponent';

type Props = { section: 'skills' | 'language' };

const SkillsLanguageSettings = ({ section }: Props) => {
    const { resume } = useContext(ResumeContext);
    const { infoItalic } = resume?.settings[section]!;
    const { updateLanguageSettings, updateSkillsSettings } = useUpdateSettings();
    const [values, setValues] = useState(
        removeTypename(resume?.settings[section]!)
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
        <SettingsCard title={camelCaseToString(section)}>
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
            <Section title="Info Style">
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
                    <label htmlFor="infoItalic">Italic</label>
                </div>
            </Section>
        </SettingsCard>
    );
};

export default SkillsLanguageSettings;
