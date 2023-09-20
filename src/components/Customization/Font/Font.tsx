import Button from '@/components/UI/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { fonts } from '@/utils/consts/fonts';
import React, { useContext } from 'react';
import SettingsCard from '../shared/SettingsCard';
import style from './Font.module.scss';
import { useTranslation } from 'next-i18next';

const Font = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const { type: currentType, font: currentFont } = settings?.font!;
    const { updateFont } = useUpdateSettings();

    return (
        <SettingsCard title={t('font')}>
            <div className={style.fonts}>
                {fonts.map((fontType) => (
                    <Button
                        key={fontType.type}
                        btnType="customization"
                        isActive={currentType === fontType.type}
                        onClick={() =>
                            updateFont({ type: fontType.type, font: fontType.fonts[0] })
                        }
                    >
                        <p
                            style={{
                                fontFamily: fontType.type === 'serif' ? 'serif' : 'sans-serif',
                                fontSize: '3rem',
                            }}
                        >
                            Aa
                        </p>
                        <p> {`${fontType.title}`}</p>
                    </Button>
                ))}
            </div>
            <div className={style.fontsOptions}>
                {fonts.map(
                    (fontType) =>
                        fontType.type === currentType &&
            fontType.fonts.map((font) => (
                <Button
                    key={font}
                    btnType="customization"
                    isActive={currentFont === font}
                    onClick={() => updateFont({ type: fontType.type, font })}
                >
                    <p style={{ minWidth: '6rem' }}>{font}</p>
                </Button>
            ))
                )}
            </div>
        </SettingsCard>
    );
};

export default Font;
