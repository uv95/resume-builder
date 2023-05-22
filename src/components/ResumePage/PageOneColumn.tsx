import { ResumeContext } from '@/context/ResumeContext';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext } from 'react';
import PageSection from './PageSection';

type Props = { sections: string[]; resumeArraySections: IResumeArraySections };

const PageOneColumn = ({ sections, resumeArraySections }: Props) => {
  const { resume } = useContext(ResumeContext);
  const leftRightMargin = resume?.settings.spacing.leftRightMargin!;
  const topBottomMargin = resume?.settings.spacing.topBottomMargin!;

  return (
    <div
      style={{
        paddingLeft: leftRightMargin + 'mm',
        paddingRight: leftRightMargin + 'mm',
        paddingTop: '1.5rem',
        paddingBottom: topBottomMargin + 'mm',
      }}
    >
      {sections.map((section) => (
        <PageSection
          key={section}
          section={section}
          resumeArraySections={resumeArraySections}
        />
      ))}
    </div>
  );
};

export default PageOneColumn;
