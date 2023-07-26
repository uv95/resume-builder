import { AdditionalContentSection, IEducationItem, ILanguageItem, IProfessionalExperienceItem, IProfileItem, IProjectItem, ISkillsItem } from '@/utils/types/contentTypes'
import { ISettings, Sections } from '@/utils/types/resumeTypes'
import { Position } from '@/utils/types/settingsTypes'
import { memo } from 'react'
import EducationBlock from '../EducationBlock/EducationBlock'
import ProfessionalExperienceBlock from '../ProfessionalExperienceBlock/ProfessionalExperienceBlock'
import ProfileBlock from '../ProfileBlock/ProfileBlock'
import ProjectBlock from '../ProjectBlock/ProjectBlock'
import SkillsLanguageBlock from '../SkillsLanguageBlock/SkillsLanguageBlock'

type Props = {
    section: Sections;
    sectionContent: AdditionalContentSection;
    settings: ISettings,
    sectionPosition?: Position.LEFT | Position.RIGHT;
}

const SectionContent = ({sectionContent, section, settings, sectionPosition}: Props) => {
    return (
        <>    
            {section === Sections.SKILLS && (
                <SkillsLanguageBlock
                    settings={settings}
                    section={Sections.SKILLS}
                    sectionPosition={sectionPosition}
                    items={sectionContent.items as ISkillsItem[]}
                />
            )}
            {section === Sections.EDUCATION && (
                <EducationBlock settings={settings} sectionPosition={sectionPosition} items={sectionContent.items as IEducationItem[]}/>
            )}
            {section === Sections.PROFILE && <ProfileBlock items={sectionContent.items as IProfileItem[]}/>}
            {section === Sections.PROJECT && (
                <ProjectBlock settings={settings} sectionPosition={sectionPosition} items={sectionContent.items as IProjectItem[]}/>
            )}
            {section === Sections.PROFESSIONAL_EXPERIENCE && (
                <ProfessionalExperienceBlock settings={settings} sectionPosition={sectionPosition} items={sectionContent.items as IProfessionalExperienceItem[]}/>
            )}
            {section === Sections.LANGUAGE && (
                <SkillsLanguageBlock settings={settings}
                    section={Sections.LANGUAGE}
                    sectionPosition={sectionPosition}
                    items={sectionContent.items as ILanguageItem[]}
                />
            )}
        </>
    )
}

export default memo(SectionContent)