import useSetColor from '@/hooks/useSetColor'
import { IContent, ISettings, Sections } from '@/utils/types/resumeTypes'
import { ColorOf, Position } from '@/utils/types/settingsTypes'
import React from 'react'
import PageOneColumn from './PageOneColumn'
import PageTwoColumns from './PageTwoColumns'
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock'

type Props = {className?: string, settings: ISettings,content:IContent;additionalStyle?: React.CSSProperties }

const PageContent = ({className,additionalStyle,settings,content}: Props) => {
    const { setColor } = useSetColor(settings);

    const pageContentStyle = {
        background: setColor({
            colorOf: ColorOf.BG,
        }),
        fontSize:settings.spacing.fontSize,
        lineHeight:settings.spacing.lineHeight,
        display:
settings.layout.position === Position.TOP
    ? 'flex'
    : 'block',
        flexDirection:
settings.layout.position === Position.TOP
    ? 'column'
    : 'initial',
        fontFamily: settings.font.font,
    } as React.CSSProperties;

    return (
        <div
           
            className={className}
            style={{...pageContentStyle, ...additionalStyle}}
        >
            {settings.layout.position === Position.TOP && (
                <PersonalDetailsBlock content={content} settings={settings}/>
            )}

            {settings.layout.columns === 1 ? (
                <PageOneColumn
                    content={content} settings={settings}
                    sections={settings.sectionsOrder.top as Sections[]}
                />
            ):
                <PageTwoColumns
                    content={content} settings={settings}
                    columnWidth={settings.layout.columnWidth}
                />
            }
        </div>
    )
}

export default PageContent