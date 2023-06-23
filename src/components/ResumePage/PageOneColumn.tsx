import { ResumeContext } from '@/context/ResumeContext';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { IResumeArraySections, Sections } from '@/utils/types/resumeTypes';
import React, { useContext } from 'react';
import PageSection from './PageSection';

type Props = {
  sections: Sections[];
};

const PageOneColumn = ({ sections }: Props) => {
    const { settings,content } = useContext(ResumeContext);
    const leftRightMargin = settings?.spacing.leftRightMargin!;
    const topBottomMargin = settings?.spacing.topBottomMargin!;

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
                    contentSection={content![section as keyof typeof content] as AdditionalContentSection}
                />
            ))}
        </div>
    );
};

export default PageOneColumn;
