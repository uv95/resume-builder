import Button from '@/components/Button/Button';
import React, { useContext } from 'react';
import style from './Heading.module.scss';
import SettingsCard from '../UI/SettingsCard';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ResumeContext } from '@/context/ResumeContext';
import Size from '../Size';
import Section from '../UI/Section';

const Heading = () => {
  const { resume } = useContext(ResumeContext);
  const { style: headingStyle, size, uppercase } = resume?.settings.heading!;

  const { updateHeading } = useUpdateSettings();

  return (
    <SettingsCard title="Heading">
      <Section title="Style">
        <div className={style.style}>
          <Button
            type="customization"
            active={headingStyle === 'box'}
            onClick={() => updateHeading({ size, uppercase, style: 'box' })}
          >
            <div
              className={`${style.box} ${
                headingStyle === 'box' ? style.active : ''
              }`}
            ></div>
          </Button>
          <Button
            type="customization"
            active={headingStyle === 'simple'}
            onClick={() => updateHeading({ size, uppercase, style: 'simple' })}
          >
            <div
              className={`${style.simple} ${
                headingStyle === 'simple' ? style.active : ''
              }`}
            ></div>
          </Button>
          <Button
            type="customization"
            active={headingStyle === 'topBottomLine'}
            onClick={() =>
              updateHeading({ size, uppercase, style: 'topBottomLine' })
            }
          >
            <div
              className={`${style.topBottomLine} ${
                headingStyle === 'topBottomLine' ? style.active : ''
              }`}
            ></div>
          </Button>
          <Button
            type="customization"
            active={headingStyle === 'line'}
            onClick={() => updateHeading({ size, uppercase, style: 'line' })}
          >
            <div
              className={`${style.line} ${
                headingStyle === 'line' ? style.active : ''
              }`}
            ></div>
          </Button>
        </div>
      </Section>

      <Size section="heading" />

      <div className={style.checkboxGroup}>
        <input
          type="checkbox"
          id="uppercase"
          checked={uppercase}
          onChange={() =>
            updateHeading({ size, uppercase: !uppercase, style: headingStyle })
          }
          className={style.input}
        />
        <label htmlFor="uppercase">Uppercase</label>
      </div>
    </SettingsCard>
  );
};

export default Heading;
