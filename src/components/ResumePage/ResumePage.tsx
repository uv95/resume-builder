import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock';
import style from './ResumePage.module.scss';
import ResumePageSection from './ResumePageSection';

const ResumePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resume } = useContext(ResumeContext);
  const { setColor } = useSetColor();
  const [resumeArraySections, setResumeArraySections] =
    useState<IResumeArraySections>({
      language: [],
      skills: [],
      professionalExperience: [],
      project: [],
      education: [],
      profile: [],
    });

  const [leftColumnWidth, setLeftColumnWidth] = useState(0);
  const [rightColumnWidth, setRightColumnWidth] = useState(0);

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
    if (resume) {
      setResumeArraySections({
        language: resume.content.language,
        skills: resume.content.skills,
        professionalExperience: resume.content.professionalExperience,
        project: resume.content.project,
        education: resume.content.education,
        profile: resume.content.profile,
      });
      setRightColumnWidth(resume?.settings.layout.columnWidth.right);
      setLeftColumnWidth(resume?.settings.layout.columnWidth.left);
    }
  }, [resume]);

  return (
    <div ref={ref} className={style.resume}>
      <div
        className={style.page}
        style={{
          transform: `scale(${resumePageWidth * 0.00126})`,
          background: setColor({
            colorOf: 'background',
          }),
        }}
      >
        {resume?.settings.layout.position === 'top' && <PersonalDetailsBlock />}

        {resume?.settings.layout.columns === 1 &&
          resume?.settings.sectionsOrder.top.map((section) => (
            <div key={section}>
              <ResumePageSection
                section={section}
                resumeArraySections={resumeArraySections}
              />
            </div>
          ))}
        {resume?.settings.layout.columns === 2 && (
          <div className={style.content}>
            <div
              style={{
                width: `${leftColumnWidth}%`,
                background: setColor({
                  colorOf: 'background',
                  sectionPosition: 'left',
                }),
              }}
            >
              {resume?.settings.layout.position === 'left' && (
                <PersonalDetailsBlock />
              )}
              {resume.settings.sectionsOrder.left.map((section) => (
                <div key={section}>
                  <ResumePageSection
                    sectionPosition="left"
                    section={section}
                    resumeArraySections={resumeArraySections}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                width: `${rightColumnWidth}%`,
                background: setColor({
                  colorOf: 'background',
                  sectionPosition: 'right',
                }),
              }}
            >
              {resume?.settings.layout.position === 'right' && (
                <PersonalDetailsBlock />
              )}
              {resume.settings.sectionsOrder.right.map((section) => (
                <div key={section}>
                  <ResumePageSection
                    sectionPosition="right"
                    section={section}
                    resumeArraySections={resumeArraySections}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePage;
