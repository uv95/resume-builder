import Button from '@/components/UI/Button/Button';
import { useHeadingContext } from '@/context/settings';
import useUpdateHeading from '@/hooks/settings/useUpdateHeading';
import { removeTypename } from '@/utils/removeTypename';
import { HeadingStyle, Size } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo, useState } from 'react';
import Section from '../shared/Section';
import SettingsButtons from '../shared/SettingsButtons';
import SettingsCard from '../shared/SettingsCard';
import style from './Heading.module.scss';

const Heading = () => {
    const {t} = useTranslation(['customization'])

    const { heading } = useHeadingContext()
    const headingStyle = heading?.style;
    const size = heading?.size;
    const isUppercase = heading?.isUppercase;

    const updateHeading = useUpdateHeading();
    const [values, setValues] = useState(
        removeTypename(heading!)
    );
    const update = (updatedField: 'size' | 'style', newVal: string) =>
        updateHeading({
            ...values,
            [updatedField]: newVal,
        });

    const updateHeadingSetValues = (style: HeadingStyle) => {
        updateHeading({ size, isUppercase, style });
        setValues({ size, isUppercase, style });
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
                    id="isUppercase"
                    checked={isUppercase}
                    onChange={() => {
                        updateHeading({ size, isUppercase: !isUppercase, style: headingStyle });
                        setValues({ size, isUppercase: !isUppercase, style: headingStyle });
                    }}
                    className="checkboxInput"
                />
                <label htmlFor="isUppercase">{t('uppercase')}</label>
            </div>
        </SettingsCard>
    );
};

export default memo(Heading);
