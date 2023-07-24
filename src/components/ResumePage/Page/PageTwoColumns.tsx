import { useLayoutContext, useSpacingContext } from '@/context/settings';
import useSetColor from '@/hooks/useSetColor';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { IContent, ISettings, Sections } from '@/utils/types/resumeTypes';
import { ColorOf, Position } from '@/utils/types/settingsTypes';
import { memo } from 'react';
import PageSection from '../PageSection/PageSection';
import PersonalDetailsBlock from '../PersonalDetailsBlock/PersonalDetailsBlock';
import style from './Page.module.scss';

type Props = {
  columnWidth: { left: number; right: number };
  settings: ISettings,content:IContent
};

const PageTwoColumns = ({ columnWidth ,settings,content}: Props) => {
    const {spacing} = useSpacingContext()
    const {layout} = useLayoutContext();
    const position = layout?.position;
    const leftSections= settings?.sectionsOrder.left as Sections[];
    const rightSections = settings?.sectionsOrder.right as Sections[];
    const leftRightMargin = spacing?.leftRightMargin!;
    const topBottomMargin = spacing?.topBottomMargin!;

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
                {position === Position.LEFT && <PersonalDetailsBlock content={content} settings={settings}/>}
                {leftSections&&leftSections.map((section,index) => (
                    <PageSection
                        key={section}
                        sectionIndex={index}
                        settings={settings}
                        sectionPosition={Position.LEFT}
                        section={section}
                        sectionContent={content[section as keyof typeof content] as AdditionalContentSection}
                    />
                ))}
            </div>
            <div style={rightSectionsStyle}>
                {position === Position.RIGHT && <PersonalDetailsBlock content={content} settings={settings}/>}
                {rightSections&&rightSections.map((section,index) => (
                    <PageSection
                        key={section}
                        sectionIndex={index}
                        settings={settings}
                        sectionPosition={Position.RIGHT}
                        section={section}
                        sectionContent={content![section as keyof typeof content] as AdditionalContentSection}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(PageTwoColumns);
