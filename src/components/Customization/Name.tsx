import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../Button/Button';
import Size from './Size';
import Section from './UI/Section';
import SettingsCard from './UI/SettingsCard';

const Name = () => {
  const { resume } = useContext(ResumeContext);
  const { style: nameStyle, size } = resume?.settings.name!;

  const { updateName } = useUpdateSettings();

  return (
    <SettingsCard title="Name">
      <Size section="name" />
      <Section title="Style">
        <div className="flex">
          {['normal', 'bold'].map((item) => (
            <Button
              key={item}
              type="customization"
              active={nameStyle === item}
              onClick={() =>
                updateName({
                  style: item as 'normal' | 'bold',
                  size,
                })
              }
            >
              <p
                style={{
                  fontWeight: item === 'bold' ? 'bold' : 'normal',
                  minWidth: '6rem',
                }}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </p>
            </Button>
          ))}
        </div>
      </Section>
    </SettingsCard>
  );
};

export default Name;
