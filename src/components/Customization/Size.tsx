import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext, useState } from 'react';
import Button from '../Button/Button';
import Section from './UI/Section';

type Props = { section: string };

const Size = ({ section }: Props) => {
  const { resume } = useContext(ResumeContext);
  const {
    style: headingStyle,
    size: headingSize,
    uppercase,
  } = resume?.settings.heading!;

  const { style: jobTitleStyle, size: jobTitleSize } =
    resume?.settings.jobTitle!;

  const { style: nameStyle, size: nameSize } = resume?.settings.name!;

  const [size, setSize] = useState({
    heading: headingSize,
    jobTitle: jobTitleSize,
    name: nameSize,
  });
  const { updateHeading, updateJobTitle, updateName } = useUpdateSettings();

  const updateSize = (size: 's' | 'm' | 'l') => {
    if (section === 'heading')
      return updateHeading({
        size,
        uppercase,
        style: headingStyle,
      });
    if (section === 'jobTitle')
      return updateJobTitle({
        size,
        style: jobTitleStyle,
      });
    if (section === 'name')
      return updateName({
        size,
        style: nameStyle,
      });
  };

  return (
    <Section title="Size">
      <div className="flex">
        {['s', 'm', 'l'].map((item) => (
          <Button
            key={item}
            type="customization"
            active={size[section as keyof typeof size] === item}
            onClick={() => {
              updateSize(item as 's' | 'm' | 'l');
              setSize((prev) => ({ ...prev, [section]: item }));
            }}
          >
            <p>{item.toUpperCase()}</p>
          </Button>
        ))}
      </div>
    </Section>
  );
};

export default Size;
