import { ResumeContext } from '@/context/ResumeContext';
import { spacingData } from '@/utils/spacing';
import React, { memo, useContext, useEffect, useState } from 'react';
import SettingsCard from '../shared/SettingsCard';
import Bar from './Bar';
import { useTranslation } from 'next-i18next';
import { ISpacing } from '@/utils/types/settingsTypes';
import { SpacingContext } from '@/context/SpacingContext';

const Spacing = () => {
    const {t} = useTranslation(['customization'])
    const { spacing } = useContext(SpacingContext);   

    return (
        <SettingsCard title={t('spacing')}>
            {spacing&&spacingData.map((item) => (
                <Bar
                    key={item.name}
                    sectionName={item.name}
                    currentValue={spacing[item.name as keyof typeof spacing]}
                    values={item.values}
                />
            ))}
        </SettingsCard>
    );
};

export default memo(Spacing);
