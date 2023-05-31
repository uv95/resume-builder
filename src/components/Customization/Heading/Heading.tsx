import Button from '@/components/Button/Button';
import React, { useContext } from 'react';
import style from './Heading.module.scss';
import SettingsCard from '../SettingsCard';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ResumeContext } from '@/context/ResumeContext';

const Heading = () => {
  const { resume } = useContext(ResumeContext);
  const { style: headingStyle, size, uppercase } = resume?.settings.heading!;

  const { updateHeading } = useUpdateSettings();

  return (
    <SettingsCard title="Heading">
      <div className={style.section}>
        <h5>Style</h5>
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
      </div>

      <div className={style.section}>
        <h5>Size</h5>
        <div className="flex">
          {['s', 'm', 'l'].map((headingSize) => (
            <Button
              key={headingSize}
              classes={`${
                size === headingSize ? style.size_active : style.size
              }`}
              type="customization"
              active={size === headingSize}
              onClick={() =>
                updateHeading({
                  size: headingSize as 's' | 'm' | 'l',
                  uppercase,
                  style: headingStyle,
                })
              }
            >
              <p>{headingSize.toUpperCase()}</p>
            </Button>
          ))}
        </div>
      </div>

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
