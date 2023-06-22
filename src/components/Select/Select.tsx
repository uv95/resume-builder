import { LanguageLevel, SkillLevel } from '@/utils/types/contentTypes';
import { Field } from 'formik';
import React from 'react';

type Props = { input: 'languageLevel' | 'skillLevel' };

const Select = ({ input }: Props) => {
    const options = input === 'languageLevel' ? LanguageLevel : SkillLevel;
    return (
        <Field name={input} id={input} as="select">
            <option value="default"> --- Select level ---</option>
            {Object.keys(options)
                .filter((key) => key !== 'default')
                .map((objKey) => (
                    <option key={objKey} value={objKey}>
                        {options[objKey as keyof typeof options]}
                    </option>
                ))}
        </Field>
    );
};

export default Select;
