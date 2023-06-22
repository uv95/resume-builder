import Button from '@/components/Button/Button';
import React, { useContext, useState } from 'react';
import style from './Heading.module.scss';
import SettingsCard from '../UI/SettingsCard';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ResumeContext } from '@/context/ResumeContext';
import Section from '../UI/Section';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from '../UI/SettingsButtons';
import { HeadingStyle, Size } from '@/utils/types/settingsTypes';

const Heading = () => {
    const { resume } = useContext(ResumeContext);
    const { style: headingStyle, size, uppercase } = resume?.settings.heading!;

    const { updateHeading } = useUpdateSettings();
    const [values, setValues] = useState(
        removeTypename(resume?.settings.heading!)
    );
    const update = (updatedField: 'size' | 'style', newVal: string) =>
        updateHeading({
            ...values,
            [updatedField]: newVal,
        });

    const updateHeadingSetValues = (style: HeadingStyle) => {
        updateHeading({ size, uppercase, style });
        setValues({ size, uppercase, style });
    };

    return (
        <SettingsCard title="Heading">
            <Section title="Style">
                <div className={style.style}>
                    {Object.values(HeadingStyle).map((headingStyleItem) => (
                        <Button
                            key={headingStyleItem}
                            btnType="customization"
                            isActive={headingStyle === headingStyleItem}
                            onClick={() => updateHeadingSetValues(headingStyleItem)}
                        >
                            <div
                                className={`${style[headingStyleItem]} ${
                                    headingStyle === headingStyleItem ? style.active : ''
                                }`}
                            ></div>
                        </Button>
                    ))}
                </div>
            </Section>

            <SettingsButtons
                options={Object.values(Size)}
                updatedField="size"
                allValues={values}
                setValues={setValues}
                update={update}
            />

            <div className="checkboxGroup">
                <input
                    type="checkbox"
                    id="uppercase"
                    checked={uppercase}
                    onChange={() => {
                        updateHeading({ size, uppercase: !uppercase, style: headingStyle });
                        setValues({ size, uppercase: !uppercase, style: headingStyle });
                    }}
                    className="checkboxInput"
                />
                <label htmlFor="uppercase">Uppercase</label>
            </div>
        </SettingsCard>
    );
};

export default Heading;
