import { ISettings, Sections } from '@/utils/types/resumeTypes';
import useSetColor from '@/hooks/useSetColor';
import Heading from '../Heading/Heading';
import { ColorOf, Position } from '@/utils/types/settingsTypes';
import { AdditionalContentSection} from '@/utils/types/contentTypes';
import SectionContent from './SectionContent';
import { memo } from 'react';
import { useSpacingContext } from '@/context/settings';

type Props = {
  section: Sections;
  sectionContent: AdditionalContentSection;
  sectionPosition?: Position.LEFT | Position.RIGHT;
  settings: ISettings,
  sectionIndex:number
};

const PageSection = ({
    section,
    sectionContent,
    sectionPosition,
    settings,
    sectionIndex
}: Props) => {
    const { setColor } = useSetColor();
    const { showHeading } = settings?.profile!;
    const { spacing } =useSpacingContext();
    const { spaceBetweenSections } = spacing!;

    return (
        <div>
            {sectionContent.items.length !== 0 &&
        (section !== Sections.PROFILE ||
          (section === Sections.PROFILE && showHeading)) && 
          (<Heading 
              sectionPosition={sectionPosition} 
              sectionIndex={sectionIndex}
              sectionName={sectionContent.sectionName}/>)}
            <div 
                style={{
                    background: setColor({
                        colorOf: ColorOf.BG,
                        sectionPosition,
                    }),
                    color: setColor({
                        colorOf: ColorOf.FONT,
                        sectionPosition,
                    }),
                    marginTop: sectionIndex===0?0:spaceBetweenSections + 'px'
                }}
            >
                <SectionContent section={section} settings={settings} sectionContent={sectionContent} sectionPosition={sectionPosition}/>
            </div>
        </div>
    );
};

export default memo(PageSection);
