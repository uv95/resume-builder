import { ResumeContext } from '@/context/ResumeContext';
import React, {
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'next-i18next';
import PageContent from './PageContent';
import style from './Page.module.scss';

const Page = forwardRef(function Page(props, ref) {
    const {t} = useTranslation()

    const pageRef = useRef<HTMLDivElement>(null);
    const { settings,content } = useContext(ResumeContext);

    const [resumePageWidth, setResumePageWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', () =>
            setResumePageWidth(pageRef?.current ? pageRef.current.offsetWidth :  0)
        );
    });

    useEffect(() => {
        pageRef.current && setResumePageWidth(pageRef.current.offsetWidth);
    }, [content]);

    const additionalPageContentStyle = {transform: `scale(${resumePageWidth * 0.00126})`} as React.CSSProperties

    return (
        <>
            {settings&&content&& <div ref={pageRef} className={style.resumeContainer}>
                <div
                    ref={ref as React.RefObject<HTMLDivElement>}
                >
                    <PageContent additionalStyle={additionalPageContentStyle} className={style.pageContent} settings={settings} content={content} id="resumePage"/>
                </div>
                {/* temporary */}
                <p style={{marginTop: '1rem', opacity: 0.4}}>{t('resume-size')}</p>
            </div>}
            
        </>
        
    );
});

export default Page;
