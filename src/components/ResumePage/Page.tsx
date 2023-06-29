import { ResumeContext } from '@/context/ResumeContext';
import React, {
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import style from './Page.module.scss';
import { useTranslation } from 'next-i18next';
import PageContent from './PageContent';

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
    }, []);

    const additionalPageContentStyle = {transform: `scale(${resumePageWidth * 0.00126})`} as React.CSSProperties

    return (
        <div ref={pageRef} className={style.resume}>
            {settings&&content&& <div
                ref={ref as React.RefObject<HTMLDivElement>}
                id="resumePage"
                
            >
                <PageContent additionalStyle={additionalPageContentStyle} className={style.page} settings={settings} content={content}/>
            </div>}
            {/* temporary */}
            <p style={{marginTop: '1rem', opacity: 0.4}}>{t('resume-size')}</p>
        </div>
        
    );
});

export default Page;
