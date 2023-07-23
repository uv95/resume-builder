import { LanguageLevel, SkillLevel } from '@/utils/types/contentTypes';
import { Field } from 'formik';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

type Props = { input: 'languageLevel' | 'skillLevel' };

const Select = ({ input }: Props) => {
    const {t, i18n} = useTranslation(['content'])
    const options = input === 'languageLevel' ? LanguageLevel : SkillLevel;
    return (
        <Field name={input} id={input} as="select">
            <option value="default"> --- {t('select-level')} ---</option>
            {Object.keys(options)
                .filter((key) => key !== 'default')
                .map((objKey) => (
                    <option key={objKey} value={objKey}>
                        {i18n.language==='en' ? options[objKey as keyof typeof options] : (t(input, {returnObjects:true}) as any)[objKey]}
                    </option>
                ))}
        </Field>
    );
};

export default memo(Select);
