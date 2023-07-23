import { useSpacingContext } from '@/context/SpacingContext';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { IContent, ISettings, Sections } from '@/utils/types/resumeTypes';
import { memo } from 'react';
import PageSection from '../PageSection/PageSection';

type Props = {
  sections: Sections[];
  settings: ISettings,
  content:IContent
};

const PageOneColumn = ({ sections,settings,content }: Props) => {
    const { spacing } =useSpacingContext();
    const leftRightMargin = spacing?.leftRightMargin!;
    const topBottomMargin = spacing?.topBottomMargin!;

    return (
        <div
            style={{
                paddingLeft: leftRightMargin + 'mm',
                paddingRight: leftRightMargin + 'mm',
                paddingTop: '1.5rem',
                paddingBottom: topBottomMargin + 'mm',
            }}
        >
            {sections.map((section, index) => (
                <PageSection
                    key={section}
                    sectionIndex={index}
                    settings={settings}
                    section={section}
                    sectionContent={content[section as keyof typeof content] as AdditionalContentSection}
                />
            ))}
        </div>
    );
};

export default memo(PageOneColumn);
