import React, { useContext } from 'react';
import SettingsCard from './UI/SettingsCard';
import Style from './Style';
import Section from './UI/Section';
import Button from '../Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';

const Subtitle = () => {
  const { resume } = useContext(ResumeContext);
  const { style, position } = resume?.settings.subtitle!;
  const { updateSubtitle } = useUpdateSettings();

  return (
    <SettingsCard title="Subtitle">
      <Style section="subtitle" />
      <Section title="Position">
        <div className="flex">
          <Button
            type="customization"
            active={position === 'sameLine'}
            onClick={() =>
              updateSubtitle({
                position: 'sameLine',
                style,
              })
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
            active={position === 'nextLine'}
            onClick={() =>
              updateSubtitle({
                position: 'nextLine',
                style,
              })
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
      </Section>
    </SettingsCard>
  );
};

export default Subtitle;
