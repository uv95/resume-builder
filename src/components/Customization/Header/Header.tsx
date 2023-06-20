import Button from '@/components/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext, useState } from 'react';
import SettingsCard from '../UI/SettingsCard';
import SmileIcon from './SmileIcon';
import DetailsIcons from '@/components/DetailsIcons';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import Section from '../UI/Section';
import { removeTypename } from '@/utils/removeTypename';
import SettingsButtons from '../UI/SettingsButtons';
import {
  HeaderAdditionalInfoStyle,
  HeaderPosition,
} from '@/utils/types/settingsTypes';

const Header = () => {
  const { resume } = useContext(ResumeContext);
  const { additionalInfoOrder, additionalInfoStyle, position } =
    resume?.settings.header!;

  const { updateHeader } = useUpdateSettings();
  const [values, setValues] = useState(
    removeTypename(resume?.settings.header!)
  );
  const update = (
    updatedField: 'additionalInfoStyle' | 'position',
    newVal: string
  ) =>
    updateHeader({
      ...values,
      [updatedField]: newVal,
    });

  return (
    <SettingsCard title="Header">
      <SettingsButtons
        options={Object.values(HeaderPosition)}
        updatedField="position"
        allValues={values}
        setValues={setValues}
        update={update}
      />

      <Section title="Details Style">
        <div className="flex">
          {Object.values(HeaderAdditionalInfoStyle).map((detailsStyle) => (
            <Button
              key={detailsStyle}
              btnType="customization"
              isActive={additionalInfoStyle === detailsStyle}
              onClick={() =>
                updateHeader({
                  additionalInfoOrder,
                  position,
                  additionalInfoStyle: detailsStyle,
                })
              }
            >
              <div
                className="flex gap-05 centered"
                style={{
                  minWidth: '6rem',
                }}
              >
                {detailsStyle === HeaderAdditionalInfoStyle.ICON ? (
                  <SmileIcon
                    fill={
                      additionalInfoStyle === HeaderAdditionalInfoStyle.ICON
                        ? 'rgb(33, 72, 200)'
                        : 'rgb(75, 75, 75)'
                    }
                  />
                ) : (
                  <p style={{ marginBottom: '0.2rem' }}>|</p>
                )}
                <p>{detailsStyle[0].toUpperCase() + detailsStyle.slice(1)}</p>
              </div>
            </Button>
          ))}
        </div>
      </Section>

      {additionalInfoOrder.length !== 0 && (
        <Section title="Change Order">
          <div className="flex">
            {additionalInfoOrder.map((info) => (
              <Button key={info} btnType="gray" onClick={() => {}}>
                <div className="centered" style={{ height: '2.5rem' }}>
                  <DetailsIcons
                    fill="rgb(75, 75, 75)"
                    size={15}
                    dataName={info}
                  />
                </div>
              </Button>
            ))}
          </div>
        </Section>
      )}
    </SettingsCard>
  );
};

export default Header;
