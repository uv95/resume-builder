import Button from '@/components/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import SettingsCard from '../SettingsCard';
import style from './Subtitle.module.scss';

type Props = {};

const Subtitle = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const { style: subtitleStyle, placement } = resume?.settings.subtitle!;

  const { updateSubtitle } = useUpdateSettings();

  return (
    <SettingsCard title="Subtitle">
      <div className={style.section}>
        <h5>Style</h5>
        <div className="flex">
          {['normal', 'bold', 'italic'].map((style) => (
            <Button
              key={style}
              type="customization"
              active={subtitleStyle === style}
              onClick={() =>
                updateSubtitle({
                  placement,
                  style: style as 'normal' | 'bold' | 'italic',
                })
              }
            >
              <p
                style={{
                  fontWeight: style === 'bold' ? 'bold' : 'normal',
                  fontStyle: style === 'italic' ? 'italic' : 'normal',
                  minWidth: '6rem',
                }}
              >
                {style[0].toUpperCase() + style.slice(1)}
              </p>
            </Button>
          ))}
        </div>
      </div>
      <div className={style.section}>
        <h5>Placement</h5>
        <div className="flex">
          <Button
            type="customization"
            active={placement === 'sameLine'}
            onClick={() =>
              updateSubtitle({ style: subtitleStyle, placement: 'sameLine' })
            }
          >
            <p
              style={{
                minWidth: '6rem',
              }}
            >
              Same Line
            </p>
          </Button>
          <Button
            type="customization"
            active={placement === 'nextLine'}
            onClick={() =>
              updateSubtitle({ style: subtitleStyle, placement: 'nextLine' })
            }
          >
            <p
              style={{
                minWidth: '6rem',
              }}
            >
              Next Line
            </p>
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default Subtitle;
