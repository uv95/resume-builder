import useSetColor from '@/hooks/useSetColor'
import { IContent, ISettings, Sections } from '@/utils/types/resumeTypes'
import { ColorOf, Position } from '@/utils/types/settingsTypes'
import PageOneColumn from './PageOneColumn'
import PageTwoColumns from './PageTwoColumns'
import PersonalDetailsBlock from '../PersonalDetailsBlock/PersonalDetailsBlock'
import { forwardRef, memo } from 'react'
import { useLayoutContext, useSpacingContext } from '@/context/settings'

type Props = {
    id?: string,
    className?: string, 
    settings: ISettings,
    content:IContent;
    additionalStyle?: React.CSSProperties; 
    ref: React.ForwardedRef<HTMLDivElement> }

const PageContent = forwardRef(function PageContent(props:Props, ref) {
    const {id, className, additionalStyle, settings, content}=props;

    const { setColor } = useSetColor();
    const {layout} = useLayoutContext();
    const {spacing} = useSpacingContext()

    const position = layout?.position;
    const columns = layout?.columns;
    const columnWidth = layout?.columnWidth;
    const fontSize = spacing?.fontSize;
    const lineHeight = spacing?.lineHeight;

    const pageContentStyle = {
        background: setColor({
            colorOf: ColorOf.BG,
        }),
        fontSize,
        lineHeight,
        display: position === Position.TOP
            ? 'flex'
            : 'block',
        flexDirection: position === Position.TOP ? 
            'column'
            : 'initial',
        fontFamily: settings.font.font,
    } as React.CSSProperties;

    return (
        <div ref={ref as React.ForwardedRef<HTMLDivElement>}
            id={id || ''}
            className={className || ''}
            style={{...pageContentStyle, ...additionalStyle}}
        >
            {position === Position.TOP && (
                <PersonalDetailsBlock content={content} settings={settings}/>
            )}

            {columns === 1 ? (
                <PageOneColumn
                    content={content} settings={settings}
                    sections={settings.sectionsOrder.top as Sections[]}
                />
            ):
                <PageTwoColumns
                    content={content} settings={settings}
                    columnWidth={columnWidth!}
                />
            }
        </div>
    )
})

export default memo(PageContent)