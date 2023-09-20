import { useSpacingContext } from '@/context/settings';
import { spacingData } from '@/utils/consts/spacing';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import SettingsCard from '../shared/SettingsCard';
import Bar from './Bar';

const Spacing = () => {
    const {t} = useTranslation(['customization'])
    const { spacing } = useSpacingContext();   

    return (
        <SettingsCard title={t('spacing')}>
            {spacing && spacingData.map((item) => (
                <Bar
                    key={item.name}
                    sectionName={item.name}
                    currentValue={spacing[item.name]}
                    values={item.values}
                />
            ))}
        </SettingsCard>
    );
};

export default memo(Spacing);
