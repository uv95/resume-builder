import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { IContent, IResumeArraySections, ISettings, Sections } from '@/utils/types/resumeTypes';
import { ColorOf, Position } from '@/utils/types/settingsTypes';
import React, { useContext } from 'react';
import style from './Page.module.scss';
import PageSection from './PageSection';
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock';

type Props = {
  columnWidth: { left: number; right: number };
  settings: ISettings,content:IContent
};

const PageTwoColumns = ({ columnWidth ,settings,content}: Props) => {
    // const { settings,content } = useContext(ResumeContext);
    const position = settings?.layout.position;
    const  leftSections= settings?.sectionsOrder.left as Sections[];
    const rightSections = settings?.sectionsOrder.right as Sections[];
    const leftRightMargin = settings?.spacing.leftRightMargin!;
    const topBottomMargin = settings?.spacing.topBottomMargin!;

    const { setColor } = useSetColor(settings);
   
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
                {position === Position.LEFT && <PersonalDetailsBlock content={content} settings={settings}/>}
                {leftSections&&leftSections.map((section) => (
                    <PageSection
                        key={section}
                        content={content} settings={settings}
                        sectionPosition={Position.LEFT}
                        section={section}
                        contentSection={content[section as keyof typeof content] as AdditionalContentSection}
                    />
                ))}
            </div>
            <div style={rightSectionsStyle}>
                {position === Position.RIGHT && <PersonalDetailsBlock content={content} settings={settings}/>}
                {rightSections&&rightSections.map((section) => (
                    <PageSection
                        key={section}
                        content={content} settings={settings}
                        sectionPosition={Position.RIGHT}
                        section={section}
                        contentSection={content![section as keyof typeof content] as AdditionalContentSection}
                    />
                ))}
            </div>
        </div>
    );
};

export default PageTwoColumns;
