import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext, useState } from 'react';
import Button from '../Button/Button';
import Section from './UI/Section';

type Props = { section: string };

const Style = ({ section }: Props) => {
  const { resume } = useContext(ResumeContext);
  const { style: subtitleStyle, position: subtitlePosition } =
    resume?.settings.subtitle!;
  const { style: jobTitleStyle, size: jobTitleSize } =
    resume?.settings.jobTitle!;

  const [sectionStyle, setSectionStyle] = useState({
    subtitle: subtitleStyle,
    jobTitle: jobTitleStyle,
  });

  const { updateSubtitle, updateJobTitle } = useUpdateSettings();

  const updateStyle = (style: 'normal' | 'bold' | 'italic') => {
    if (section === 'subtitle')
      return updateSubtitle({
        style,
        position: subtitlePosition,
      });
    if (section === 'jobTitle')
      return updateJobTitle({
        style,
        size: jobTitleSize,
      });
  };

  return (
    <Section title="Style">
      <div className="flex">
        {['normal', 'bold', 'italic'].map((item) => (
          <Button
            key={item}
            type="customization"
            active={sectionStyle[section as keyof typeof sectionStyle] === item}
            onClick={() => {
              updateStyle(item as 'normal' | 'bold' | 'italic');
              setSectionStyle((prev) => ({ ...prev, [section]: item }));
            }}
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
