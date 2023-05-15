import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import EducationBlock from './EducationBlock/EducationBlock';
import LanguageBlock from './LanguageBlock/LanguageBlock';
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock';
import ProfessionalExperienceBlock from './ProfessionalExperienceBlock/ProfessionalExperienceBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';
import ProjectBlock from './ProjectBlock/ProjectBlock';
import SkillsBlock from './SkillsBlock/SkillsBlock';
import style from './ResumePage.module.scss';

type Props = {};

const ResumePage = ({}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const [resumePageWidth, setResumePageWidth] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () =>
      setResumePageWidth(ref?.current ? ref.current.offsetWidth : 0)
    );
  });

  useEffect(() => {
    ref.current && setResumePageWidth(ref.current.offsetWidth);
  }, []);

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
    <div ref={ref} className={style.resume}>
      <div
        className={style.page}
        style={{
          transform: `scale(${resumePageWidth * 0.00126})`,
        }}
      >
        <PersonalDetailsBlock />

        {resume?.settings.sectionsOrder.top.map((section) => (
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
