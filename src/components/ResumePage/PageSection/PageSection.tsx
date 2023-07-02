import { ISettings, Sections } from '@/utils/types/resumeTypes';
import useSetColor from '@/hooks/useSetColor';
import Heading from '../Heading/Heading';
import { ColorOf, Position } from '@/utils/types/settingsTypes';
import { AdditionalContentSection} from '@/utils/types/contentTypes';
import SectionContent from './SectionContent';

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
    const { setColor } = useSetColor(settings);
    const { showHeading } = settings?.profile!;

    return (
        <div>
            {sectionContent.items.length !== 0 &&
        (section !== Sections.PROFILE ||
          (section === Sections.PROFILE && showHeading)) && 
          (<Heading sectionPosition={sectionPosition} sectionIndex={sectionIndex}
              settings={settings} sectionName={sectionContent.sectionName}/> )}
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
                }}
            >
                <SectionContent section={section} settings={settings} sectionContent={sectionContent} sectionPosition={sectionPosition}/>
            </div>
        </div>
    );
};

export default PageSection;
