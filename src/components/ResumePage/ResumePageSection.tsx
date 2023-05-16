import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
import React from 'react';
import EducationBlock from './EducationBlock/EducationBlock';
import LanguageBlock from './LanguageBlock/LanguageBlock';
import ProfessionalExperienceBlock from './ProfessionalExperienceBlock/ProfessionalExperienceBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';
import ProjectBlock from './ProjectBlock/ProjectBlock';
import SkillsBlock from './SkillsBlock/SkillsBlock';
import style from './ResumePage.module.scss';

type Props = {
  section: string;
  resumeArraySections: IResumeArraySections;
};

const ResumePageSection = ({ section, resumeArraySections }: Props) => {
  return (
    <>
      {resumeArraySections[section as keyof typeof resumeArraySections]
        .length !== 0 && (
        <div className={style.sectionTitle}>
          {inputData[section as keyof typeof inputData].title}
        </div>
      )}
      {section === 'skills' && <SkillsBlock />}
      {section === 'education' && <EducationBlock />}
      {section === 'profile' && <ProfileBlock />}
      {section === 'project' && <ProjectBlock />}
      {section === 'professionalExperience' && <ProfessionalExperienceBlock />}
      {section === 'language' && <LanguageBlock />}
    </>
  );
};

export default ResumePageSection;
