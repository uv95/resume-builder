import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext, useEffect, useState } from 'react';
import EducationBlock from '../pageBlocks/EducationBlock/EducationBlock';
import LanguageBlock from '../pageBlocks/LanguageBlock/LanguageBlock';
import PersonalDetailsBlock from '../pageBlocks/PersonalDetailsBlock/PersonalDetailsBlock';
import ProfessionalExperienceBlock from '../pageBlocks/ProfessionalExperienceBlock/ProfessionalExperienceBlock';
import ProfileBlock from '../pageBlocks/ProfileBlock/ProfileBlock';
import ProjectBlock from '../pageBlocks/ProjectBlock/ProjectBlock';
import SkillsBlock from '../pageBlocks/SkillsBlock/SkillsBlock';
import style from './ResumePage.module.scss';

type Props = {};

const ResumePage = ({}: Props) => {
  const { resume } = useContext(ResumeContext);
  const [resumeArraySections, setResumeArraySections] =
    useState<IResumeArraySections>({
      language: [],
      skills: [],
      professionalExperience: [],
      project: [],
      education: [],
      profile: [],
    });

  useEffect(() => {
    resume &&
      setResumeArraySections({
        language: resume.content.language,
        skills: resume.content.skills,
        professionalExperience: resume.content.professionalExperience,
        project: resume.content.project,
        education: resume.content.education,
        profile: resume.content.profile,
      });
  }, [resume]);

  return (
    <div className={style.resume}>
      <div className={style.page}>
        <PersonalDetailsBlock />

        {resume?.settings.sectionsOrder.map((section) => (
          <div key={section}>
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
            {section === 'professionalExperience' && (
              <ProfessionalExperienceBlock />
            )}
            {section === 'language' && <LanguageBlock />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePage;
