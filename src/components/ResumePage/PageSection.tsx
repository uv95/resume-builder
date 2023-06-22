import { inputData } from '@/utils/data';
import { IResumeArraySections, Sections } from '@/utils/types/resumeTypes';
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

type Props = {
  section: Sections;
  resumeArraySections: IResumeArraySections;
  sectionPosition?: Position.LEFT | Position.RIGHT;
};

const PageSection = ({
    section,
    resumeArraySections,
    sectionPosition,
}: Props) => {
    const { setColor } = useSetColor();
    const { resume } = useContext(ResumeContext);
    const { showHeading } = resume?.settings.profile!;
    const { spaceBetweenSections } = resume?.settings.spacing!;

    return (
        <div
            className={style.pageSection}
            style={{ paddingBottom: spaceBetweenSections + 'px' }}
        >
            {resumeArraySections[section as keyof typeof resumeArraySections]
                .length !== 0 &&
        (section !== Sections.PROFILE ||
          (section === Sections.PROFILE && showHeading)) && (
                // eslint-disable-next-line react/jsx-indent
                <Heading sectionPosition={sectionPosition} 
                    title={inputData[section as keyof typeof inputData].title}/>
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
                    />
                )}
                {section === Sections.EDUCATION && (
                    <EducationBlock sectionPosition={sectionPosition} />
                )}
                {section === Sections.PROFILE && <ProfileBlock />}
                {section === Sections.PROJECT && (
                    <ProjectBlock sectionPosition={sectionPosition} />
                )}
                {section === Sections.PROFESSIONAL_EXPERIENCE && (
                    <ProfessionalExperienceBlock sectionPosition={sectionPosition} />
                )}
                {section === Sections.LANGUAGE && (
                    <SkillsLanguageBlock
                        section={Sections.LANGUAGE}
                        sectionPosition={sectionPosition}
                    />
                )}
            </div>
        </div>
    );
};

export default PageSection;
