import Button from '@/components/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import SettingsCard from '../UI/SettingsCard';
import SmileIcon from './SmileIcon';
import DetailsIcons from '@/components/DetailsIcons';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import Section from '../UI/Section';

type Props = {};

const Header = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const { additionalInfoOrder, additionalInfoStyle, position } =
    resume?.settings.header!;

  const { updateHeader } = useUpdateSettings();

  return (
    <SettingsCard title="Header">
      <Section title="Position">
        <div className="flex">
          {['left', 'center'].map((headerPosition) => (
            <Button
              key={headerPosition}
              type="customization"
              active={position === headerPosition}
              onClick={() =>
                updateHeader({
                  additionalInfoOrder,
                  additionalInfoStyle,
                  position: headerPosition as 'left' | 'center',
                })
              }
            >
              <p
                style={{
                  minWidth: '6rem',
                }}
              >
                {headerPosition[0].toUpperCase() + headerPosition.slice(1)}
              </p>
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Details Style">
        <div className="flex">
          {['icon', 'bar'].map((detailsStyle) => (
            <Button
              key={detailsStyle}
              type="customization"
              active={additionalInfoStyle === detailsStyle}
              onClick={() =>
                updateHeader({
                  additionalInfoOrder,
                  position,
                  additionalInfoStyle: detailsStyle as 'icon' | 'bar',
                })
              }
            >
              <div
                className="flex gap-05 centered"
                style={{
                  minWidth: '6rem',
                }}
              >
                {detailsStyle === 'icon' ? (
                  <SmileIcon
                    fill={
                      additionalInfoStyle === 'icon'
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
              <Button key={info} type="gray" onClick={() => {}}>
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
