import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock';
import style from './Page.module.scss';
import PageOneColumn from './PageOneColumn';
import PageTwoColumns from './PageTwoColumns';

const Page = () => {
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

  const [columnWidth, setColumnWidth] = useState({ left: 0, right: 0 });
  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [columns, setColumns] = useState(0);
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

      setColumnWidth({
        left: resume?.settings.layout.columnWidth.left,
        right: resume?.settings.layout.columnWidth.right,
      });
      setColumns(resume?.settings.layout.columns);
      setFontSize(resume.settings.spacing.fontSize);
      setLineHeight(resume.settings.spacing.lineHeight);
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
          fontSize,
          lineHeight,
          display:
            resume?.settings.layout.position === 'top' ? 'flex' : 'block',
          flexDirection:
            resume?.settings.layout.position === 'top' ? 'column' : 'initial',
        }}
      >
        {resume?.settings.layout.position === 'top' && <PersonalDetailsBlock />}

        {resume && columns === 1 && (
          <PageOneColumn
            sections={resume.settings.sectionsOrder.top}
            resumeArraySections={resumeArraySections}
          />
        )}

        {columns === 2 && (
          <PageTwoColumns
            resumeArraySections={resumeArraySections}
            columnWidth={columnWidth}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
