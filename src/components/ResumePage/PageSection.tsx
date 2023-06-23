import {  Sections } from '@/utils/types/resumeTypes';
import React, { useContext } from 'react';
import EducationBlock from './EducationBlock/EducationBlock';
import ProfessionalExperienceBlock from './ProfessionalExperienceBlock/ProfessionalExperienceBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';
import ProjectBlock from './ProjectBlock/ProjectBlock';
import SkillsLanguageBlock from './SkillsLanguageBlock/SkillsLanguageBlock';
import style from './Page.module.scss';
import useSetColor from '@/hooks/useSetColor';
import { ResumeContext } from '@/context/ResumeContext';
import Heading from './Heading';
import { ColorOf, Position } from '@/utils/types/settingsTypes';
import { AdditionalContentSection, IEducationItem, ILanguageItem, IProfessionalExperienceItem, IProfileItem, IProjectItem, ISkillsItem } from '@/utils/types/contentTypes';

type Props = {
  section: Sections;
  contentSection: AdditionalContentSection;
  sectionPosition?: Position.LEFT | Position.RIGHT;
};

const PageSection = ({
    section,
    contentSection,
    sectionPosition,
}: Props) => {
    const { setColor } = useSetColor();
    const { settings } = useContext(ResumeContext);
    const { showHeading } = settings?.profile!;
    const { spaceBetweenSections } = settings?.spacing!;

    return (
        <div
            className={style.pageSection}
            style={{ paddingBottom: spaceBetweenSections + 'px' }}
        >
            {contentSection.items
                .length !== 0 &&
        (section !== Sections.PROFILE ||
          (section === Sections.PROFILE && showHeading)) && (
                // eslint-disable-next-line react/jsx-indent
                <Heading sectionPosition={sectionPosition} 
                    sectionName={contentSection.sectionName}/>
            )}
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
                {section === Sections.SKILLS && (
                    <SkillsLanguageBlock
                        section={Sections.SKILLS}
                        sectionPosition={sectionPosition}
                        items={contentSection.items as ISkillsItem[]}
                    />
                )}
                {section === Sections.EDUCATION && (
                    <EducationBlock sectionPosition={sectionPosition} items={contentSection.items as IEducationItem[]}/>
                )}
                {section === Sections.PROFILE && <ProfileBlock items={contentSection.items as IProfileItem[]}/>}
                {section === Sections.PROJECT && (
                    <ProjectBlock sectionPosition={sectionPosition} items={contentSection.items as IProjectItem[]}/>
                )}
                {section === Sections.PROFESSIONAL_EXPERIENCE && (
                    <ProfessionalExperienceBlock sectionPosition={sectionPosition} items={contentSection.items as IProfessionalExperienceItem[]}/>
                )}
                {section === Sections.LANGUAGE && (
                    <SkillsLanguageBlock
                        section={Sections.LANGUAGE}
                        sectionPosition={sectionPosition}
                        items={contentSection.items as ILanguageItem[]}
                    />
                )}
            </div>
        </div>
    );
};

export default PageSection;
