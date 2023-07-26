import { useContentContext } from '@/context/ContentContext';
import { ResumeContext } from '@/context/ResumeContext';
import React, {
    forwardRef,
    memo,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import style from './Page.module.scss';
import PageContent from './PageContent';

const Page = forwardRef(function Page(props, ref) {
    const pageRef = useRef<HTMLDivElement>(null);
    const { settings } = useContext(ResumeContext);
    const { content } =useContentContext();

    const [resumePageWidth, setResumePageWidth] = useState(0);

    useEffect(() => {
        const pageRefCurrent = pageRef.current;

        window.addEventListener('resize', () =>
            setResumePageWidth(pageRefCurrent ?pageRefCurrent.offsetWidth : 0)
        );

        return () => window.removeEventListener('resize', () =>
            setResumePageWidth(pageRefCurrent ? pageRefCurrent.offsetWidth : 0)
        );
    });

    useEffect(() => {
        pageRef.current && setResumePageWidth(pageRef.current.offsetWidth);
    }, [content]);

    const additionalPageContentStyle = {transform: `scale(${resumePageWidth * 0.00126})`} as React.CSSProperties

    return (
        <>
            {settings&&content&& <div ref={pageRef} className={style.resumeContainer}>
                <PageContent ref={ref} additionalStyle={additionalPageContentStyle} className={style.pageContent} settings={settings} content={content} id="resumePage"/>

            </div>}
            
        </>
        
    );
});

export default memo(Page);
