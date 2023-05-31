import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
import Button from '../Button/Button';
import Section from './UI/Section';

type Props = { section: string };

const Style = ({ section }: Props) => {
  const { resume } = useContext(ResumeContext);
  const { style: subtitleStyle, position: subtitlePosition } =
    resume?.settings.subtitle!;
  const {
    style: jobTitleStyle,
    position: jobTitlePosition,
    size: jobTitleSize,
  } = resume?.settings.jobTitle!;

  const { updateSubtitle, updateJobTitle } = useUpdateSettings();

  const updateStyle = (style: 'normal' | 'bold' | 'italic') => {
    if (section === 'subtitle')
      return updateSubtitle({
        position: subtitlePosition,
        style,
      });
    if (section === 'jobTitle')
      return updateJobTitle({
        position: jobTitlePosition,
        size: jobTitleSize,
        style,
      });
  };
  return (
    <Section title="Style">
      <div className="flex">
        {['normal', 'bold', 'italic'].map((item) => (
          <Button
            key={item}
            type="customization"
            active={
              item === (section === 'subtitle' ? subtitleStyle : jobTitleStyle)
            }
            onClick={() => updateStyle(item as 'normal' | 'bold' | 'italic')}
          >
            <p
              style={{
                fontWeight: item === 'bold' ? 'bold' : 'normal',
                fontStyle: item === 'italic' ? 'italic' : 'normal',
                minWidth: '6rem',
              }}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </p>
          </Button>
        ))}
      </div>
    </Section>
  );
};

export default Style;
