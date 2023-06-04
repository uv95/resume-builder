import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
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

type Props = {
  section: string;
  resumeArraySections: IResumeArraySections;
  sectionPosition?: 'left' | 'right';
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
        (section !== 'profile' || (section === 'profile' && showHeading)) && (
          <Heading
            sectionPosition={sectionPosition}
            title={inputData[section as keyof typeof inputData].title}
          />
        )}
      <div
        style={{
          background: setColor({
            colorOf: 'background',
            sectionPosition,
          }),
          color: setColor({
            colorOf: 'font',
            sectionPosition,
          }),
        }}
      >
        {section === 'skills' && (
          <SkillsLanguageBlock
            section="skills"
            sectionPosition={sectionPosition}
          />
        )}
        {section === 'education' && (
          <EducationBlock sectionPosition={sectionPosition} />
        )}
        {section === 'profile' && <ProfileBlock />}
        {section === 'project' && (
          <ProjectBlock sectionPosition={sectionPosition} />
        )}
        {section === 'professionalExperience' && (
          <ProfessionalExperienceBlock sectionPosition={sectionPosition} />
        )}
        {section === 'language' && (
          <SkillsLanguageBlock
            section="language"
            sectionPosition={sectionPosition}
          />
        )}
      </div>
    </div>
  );
};

export default PageSection;
