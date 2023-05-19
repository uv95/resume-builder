import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext } from 'react';
import EducationBlock from './EducationBlock/EducationBlock';
import LanguageBlock from './LanguageBlock/LanguageBlock';
import ProfessionalExperienceBlock from './ProfessionalExperienceBlock/ProfessionalExperienceBlock';
import ProfileBlock from './ProfileBlock/ProfileBlock';
import ProjectBlock from './ProjectBlock/ProjectBlock';
import SkillsBlock from './SkillsBlock/SkillsBlock';
import style from './ResumePage.module.scss';
import useSetColor from '@/hooks/useSetColor';
import { ResumeContext } from '@/context/ResumeContext';
import HeadingLine from './HeadingLine';

type Props = {
  section: string;
  resumeArraySections: IResumeArraySections;
  sectionPosition?: 'left' | 'right';
};

const ResumePageSection = ({
  section,
  resumeArraySections,
  sectionPosition,
}: Props) => {
  const { setColor } = useSetColor();

  return (
    <>
      {resumeArraySections[section as keyof typeof resumeArraySections]
        .length !== 0 && (
        <>
          <div
            className={style.sectionTitle}
            style={{
              background: setColor({
                colorOf: 'background',
                sectionPosition,
              }),
              color: setColor({
                section: 'headings',
                colorOf: 'font',
                sectionPosition,
              }),
            }}
          >
            {inputData[section as keyof typeof inputData].title}
          </div>
          <HeadingLine sectionPosition={sectionPosition} />
        </>
      )}
      <div
        style={{
          padding: '2%',
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
        {section === 'skills' && <SkillsBlock />}
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
        {section === 'language' && <LanguageBlock />}
      </div>
    </>
  );
};

export default ResumePageSection;
