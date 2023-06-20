import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import { IResumeArraySections, Sections } from '@/utils/types/resumeTypes';
import { ColorOf, Position } from '@/utils/types/settingsTypes';
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
  const { left: leftSections, right: rightSections } = resume?.settings
    .sectionsOrder! as { left: Sections[]; right: Sections[] };
  const { leftRightMargin, topBottomMargin } = resume?.settings.spacing!;

  const { setColor } = useSetColor();

  const leftSectionsStyle = {
    width: `${columnWidth.left}%`,
    background: setColor({
      colorOf: ColorOf.BG,
      sectionPosition: Position.LEFT,
    }),
    paddingLeft: leftRightMargin + 'mm',
    paddingTop: position !== Position.TOP ? topBottomMargin + 'mm' : '1.5rem',
    paddingRight: position === Position.TOP ? 0 : leftRightMargin + 'mm',
    paddingBottom: topBottomMargin + 'mm',
    overflow: 'hidden', //temporary
  };

  const rightSectionsStyle = {
    width: `${columnWidth.right}%`,
    background: setColor({
      colorOf: ColorOf.BG,
      sectionPosition: Position.RIGHT,
    }),
    paddingTop: position !== Position.TOP ? topBottomMargin + 'mm' : '1.5rem',
    paddingRight: leftRightMargin + 'mm',
    paddingLeft: position === Position.TOP ? 0 : leftRightMargin + 'mm',
    paddingBottom: topBottomMargin + 'mm',
    overflow: 'hidden', //temporary
  };

  return (
    <div
      className={style.twoColumns}
      style={{ gap: position === Position.TOP ? '3rem' : '0' }}
    >
      <div style={leftSectionsStyle}>
        {position === Position.LEFT && <PersonalDetailsBlock />}
        {leftSections.map((section) => (
          <PageSection
            key={section}
            sectionPosition={Position.LEFT}
            section={section}
            resumeArraySections={resumeArraySections}
          />
        ))}
      </div>
      <div style={rightSectionsStyle}>
        {position === Position.RIGHT && <PersonalDetailsBlock />}
        {rightSections.map((section) => (
          <PageSection
            key={section}
            sectionPosition={Position.RIGHT}
            section={section}
            resumeArraySections={resumeArraySections}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTwoColumns;
