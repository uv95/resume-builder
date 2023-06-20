import Button from '@/components/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { fonts } from '@/utils/fonts';
import React, { useContext } from 'react';
import SettingsCard from '../UI/SettingsCard';
import style from './Font.module.scss';

const Font = () => {
  const { resume } = useContext(ResumeContext);
  const { type: currentType, font: currentFont } = resume?.settings.font!;
  const { updateFont } = useUpdateSettings();

  return (
    <SettingsCard title="Font">
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
