import useSetColor from '@/hooks/useSetColor'
import { IContent, ISettings, Sections } from '@/utils/types/resumeTypes'
import { ColorOf, Position } from '@/utils/types/settingsTypes'
import PageOneColumn from './PageOneColumn'
import PageTwoColumns from './PageTwoColumns'
import PersonalDetailsBlock from '../PersonalDetailsBlock/PersonalDetailsBlock'
import { forwardRef, memo } from 'react'
import { useSpacingContext } from '@/context/SpacingContext'
import { useLayoutContext } from '@/context/LayoutContext'

type Props = {
    id?: string,
    className?: string, 
    settings: ISettings,
    content:IContent;
    additionalStyle?: React.CSSProperties; 
    ref: React.ForwardedRef<HTMLDivElement> }

const PageContent = forwardRef(function PageContent(props:Props,ref) {
    const {id,className,additionalStyle,settings,content}=props;
    const { setColor } = useSetColor();
    const {layout} = useLayoutContext();
    const {spacing} = useSpacingContext()
    const pageContentStyle = {
        background: setColor({
            colorOf: ColorOf.BG,
        }),
        fontSize:spacing?.fontSize,
        lineHeight:spacing?.lineHeight,
        display:
    layout?.position === Position.TOP
        ? 'flex'
        : 'block',
        flexDirection:
    layout?.position === Position.TOP
        ? 'column'
        : 'initial',
        fontFamily: settings.font.font,
    } as React.CSSProperties;

    return (
        <div ref={ref as  React.ForwardedRef<HTMLDivElement>}
            id={id || ''}
            className={className || ''}
            style={{...pageContentStyle, ...additionalStyle}}
        >
            {layout?.position === Position.TOP && (
                <PersonalDetailsBlock content={content} settings={settings}/>
            )}

            {layout?.columns === 1 ? (
                <PageOneColumn
                    content={content} settings={settings}
                    sections={settings.sectionsOrder.top as Sections[]}
                />
            ):
                <PageTwoColumns
                    content={content} settings={settings}
                    columnWidth={layout?.columnWidth!}
                />
            }
        </div>
    )
})

export default memo(PageContent)