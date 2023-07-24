import Button from '@/components/UI/Button/Button';
import { useColorsContext } from '@/context/settings';
import useUpdateColors from '@/hooks/settings/useUpdateColors';
import { Mode } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import style from './Colors.module.scss';

const ModeComponent = () => {
    const {t} = useTranslation(['customization'])

    const { colors } = useColorsContext();

    const mode = colors?.mode;
    const { updateMode } = useUpdateColors();
    return (
        <div className="flex">
            <div className={style.option} onClick={() => updateMode(Mode.BASIC)}>
                <Button
                    btnType="customization"
                    className={`${style.mode} circle`}
                    isActive={mode === 'basic'}
                />
                <p>{t('basic')}</p>
            </div>
            <div className={style.option} onClick={() => updateMode(Mode.ADVANCED)}>
                <Button
                    btnType="customization"
                    className={`${style.mode} ${
                        mode === Mode.ADVANCED
                            ? style.advancedMode_active
                            : style.advancedMode
                    } circle`}
                    isActive={mode === Mode.ADVANCED}
                />
                <p>{t('advanced')}</p>
            </div>
        </div>
    );
};

export default memo(ModeComponent);
