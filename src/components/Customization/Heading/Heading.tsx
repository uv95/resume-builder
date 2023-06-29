import Button from '@/components/UI/Button/Button';
import React, { useContext, useState } from 'react';
import style from './Heading.module.scss';
import SettingsCard from '../UI/SettingsCard';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ResumeContext } from '@/context/ResumeContext';
import Section from '../UI/Section';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from '../UI/SettingsButtons';
import { HeadingStyle, Size } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';

const Heading = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { style: headingStyle, size, uppercase } = settings?.heading!;

    const { updateHeading } = useUpdateSettings();
    const [values, setValues] = useState(
        removeTypename(settings?.heading!)
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
        <SettingsCard title={t('heading')}>
            <Section title={t('style')}>
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
                <label htmlFor="uppercase">{t('uppercase')}</label>
            </div>
        </SettingsCard>
    );
};

export default Heading;
