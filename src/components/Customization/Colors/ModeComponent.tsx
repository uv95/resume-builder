import Button from '@/components/UI/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { Mode } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import style from './Colors.module.scss';
import { useTranslation } from 'next-i18next';

const ModeComponent = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const mode = settings?.colors.mode;
    const { updateMode } = useUpdateSettings();
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

export default ModeComponent;
