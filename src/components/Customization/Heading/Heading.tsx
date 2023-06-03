import Button from '@/components/Button/Button';
import React, { useContext, useState } from 'react';
import style from './Heading.module.scss';
import SettingsCard from '../UI/SettingsCard';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { ResumeContext } from '@/context/ResumeContext';
import Section from '../UI/Section';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from '../UI/SettingsButtons';

const Heading = () => {
  const { resume } = useContext(ResumeContext);
  const { style: headingStyle, size, uppercase } = resume?.settings.heading!;

  const { updateHeading } = useUpdateSettings();
  const [values, setValues] = useState(
    removeTypename(resume?.settings.heading!)
  );
  const update = (updatedField: 'size' | 'style', newVal: string) =>
    updateHeading({
      ...values,
      [updatedField]: newVal,
    });

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

      <SettingsButtons
        options={['s', 'm', 'l']}
        updatedField="size"
        allValues={values}
        setValues={setValues}
        update={update}
      />

      <div className="checkboxGroup">
        <input
          type="checkbox"
          id="uppercase"
          checked={uppercase}
          onChange={() =>
            updateHeading({ size, uppercase: !uppercase, style: headingStyle })
          }
          className="checkboxInput"
        />
        <label htmlFor="uppercase">Uppercase</label>
      </div>
    </SettingsCard>
  );
};

export default Heading;
