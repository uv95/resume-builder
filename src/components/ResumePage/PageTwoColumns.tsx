import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext } from 'react';
import style from './Page.module.scss';
import PageSection from './PageSection';
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock';

type Props = {
  resumeArraySections: IResumeArraySections;
  columnWidth: { left: number; right: number };
};

const PageTwoColumns = ({ columnWidth, resumeArraySections }: Props) => {
  const { resume } = useContext(ResumeContext);
  const { position } = resume?.settings.layout!;
  const { left: leftSections, right: rightSections } =
    resume?.settings.sectionsOrder!;
  const { leftRightMargin, topBottomMargin } = resume?.settings.spacing!;

  const { setColor } = useSetColor();

  const leftSectionsStyle = {
    width: `${columnWidth.left}%`,
    background: setColor({
      colorOf: 'background',
      sectionPosition: 'left',
    }),
    paddingLeft: leftRightMargin + 'mm',
    paddingTop: position !== 'top' ? topBottomMargin + 'mm' : 0,
    paddingRight: position === 'top' ? 0 : leftRightMargin + 'mm',
    paddingBottom: topBottomMargin + 'mm',
    overflow: 'hidden', //temporary
  };

  const rightSectionsStyle = {
    width: `${columnWidth.right}%`,
    background: setColor({
      colorOf: 'background',
      sectionPosition: 'right',
    }),
    paddingTop: position !== 'top' ? topBottomMargin + 'mm' : 0,
    paddingRight: leftRightMargin + 'mm',
    paddingLeft: position === 'top' ? 0 : leftRightMargin + 'mm',
    paddingBottom: topBottomMargin + 'mm',
    overflow: 'hidden', //temporary
  };

  return (
    <div
      className={style.twoColumns}
      style={{ gap: position === 'top' ? '3rem' : '0' }}
    >
      <div style={leftSectionsStyle}>
        {position === 'left' && <PersonalDetailsBlock />}
        {leftSections.map((section) => (
          <PageSection
            key={section}
            sectionPosition="left"
            section={section}
            resumeArraySections={resumeArraySections}
          />
        ))}
      </div>
      <div style={rightSectionsStyle}>
        {position === 'right' && <PersonalDetailsBlock />}
        {rightSections.map((section) => (
          <PageSection
            key={section}
            sectionPosition="right"
            section={section}
            resumeArraySections={resumeArraySections}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTwoColumns;
