import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import {  Sections } from '@/utils/types/resumeTypes';
import React, {
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import PersonalDetailsBlock from './PersonalDetailsBlock/PersonalDetailsBlock';
import style from './Page.module.scss';
import PageOneColumn from './PageOneColumn';
import PageTwoColumns from './PageTwoColumns';
import { ColorOf, Position } from '@/utils/types/settingsTypes';

const Page = forwardRef(function Page(props, ref) {
    const pageRef = useRef<HTMLDivElement>(null);
    const { settings } = useContext(ResumeContext);
    const { setColor } = useSetColor();

    const [resumePageWidth, setResumePageWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', () =>
            setResumePageWidth(pageRef?.current ? pageRef.current.offsetWidth :  0)
        );
    });

    useEffect(() => {
        pageRef.current && setResumePageWidth(pageRef.current.offsetWidth);
    }, []);


    return (
        <div ref={pageRef} className={style.resume}>
            {settings&& <div
                ref={ref as React.RefObject<HTMLDivElement>}
                id="resumePage"
                className={style.page}
                style={{
                    transform: `scale(${resumePageWidth * 0.00126})`,
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
                }}
            >
                {settings.layout.position === Position.TOP && (
                    <PersonalDetailsBlock />
                )}

                {settings.layout.columns === 1 ? (
                    <PageOneColumn
                        sections={settings.sectionsOrder.top as Sections[]}
                    />
                ):
                    <PageTwoColumns
                        columnWidth={settings.layout.columnWidth}
                    />
                }
            </div>}
        </div>
    );
});

export default Page;
