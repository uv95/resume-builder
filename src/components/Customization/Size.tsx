import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import React, { useContext } from 'react';
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
  const {
    style: jobTitleStyle,
    position,
    size: jobTitleSize,
  } = resume?.settings.jobTitle!;
  const { updateHeading, updateJobTitle } = useUpdateSettings();

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
        position,
        style: jobTitleStyle,
      });
  };
  return (
    <Section title="Size">
      <div className="flex">
        {['s', 'm', 'l'].map((item) => (
          <Button
            key={item}
            type="customization"
            active={
              item === (section === 'heading' ? headingSize : jobTitleSize)
            }
            onClick={() => updateSize(item as 's' | 'm' | 'l')}
          >
            <p>{item.toUpperCase()}</p>
          </Button>
        ))}
      </div>
    </Section>
  );
};

export default Size;
