import { ResumeContext } from '@/context/ResumeContext';
import { spacingData } from '@/utils/spacing';
import React, { useContext } from 'react';
import SettingsCard from '../shared/SettingsCard';
import Bar from './Bar';
import { useTranslation } from 'next-i18next';

const Spacing = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const spacing = settings?.spacing!;
    return (
        <SettingsCard title={t('spacing')}>
            {spacingData.map((item) => (
                <Bar
                    key={item.name}
                    sectionTitle={item.title}
                    sectionName={item.name}
                    currentValue={spacing[item.name as keyof typeof spacing]}
                    values={item.values}
                />
            ))}
        </SettingsCard>
    );
};

export default Spacing;
