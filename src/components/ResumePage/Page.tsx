import { ResumeContext } from '@/context/ResumeContext';
import useSetColor from '@/hooks/useSetColor';
import { IResumeArraySections, Sections } from '@/utils/types/resumeTypes';
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
    const { resume } = useContext(ResumeContext);
    const font = resume?.settings.font.font!;
    const { setColor } = useSetColor();
    const [resumeArraySections, setResumeArraySections] =
    useState<IResumeArraySections>({
        language: [],
        skills: [],
        professionalExperience: [],
        project: [],
        education: [],
        profile: [],
    });

    const [columnWidth, setColumnWidth] = useState({ left: 0, right: 0 });
    const [fontSize, setFontSize] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);
    const [columns, setColumns] = useState(0);
    const [resumePageWidth, setResumePageWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', () =>
            setResumePageWidth(pageRef?.current ? pageRef.current.offsetWidth : 0)
        );
    });

    useEffect(() => {
        pageRef.current && setResumePageWidth(pageRef.current.offsetWidth);
    }, []);

    useEffect(() => {
        if (resume) {
            setResumeArraySections({
                language: resume.content.language.items,
                skills: resume.content.skills.items,
                professionalExperience: resume.content.professionalExperience.items,
                project: resume.content.project.items,
                education: resume.content.education.items,
                profile: resume.content.profile.items,
            });

            setColumnWidth({
                left: resume?.settings.layout.columnWidth.left,
                right: resume?.settings.layout.columnWidth.right,
            });
            setColumns(resume?.settings.layout.columns);
            setFontSize(resume.settings.spacing.fontSize);
            setLineHeight(resume.settings.spacing.lineHeight);
        }
    }, [resume]);

    return (
        <div id="resumePage" ref={pageRef} className={style.resume}>
            <div
                ref={ref as React.RefObject<HTMLDivElement>}
                className={style.page}
                style={{
                    transform: `scale(${resumePageWidth * 0.00126})`,
                    background: setColor({
                        colorOf: ColorOf.BG,
                    }),
                    fontSize,
                    lineHeight,
                    display:
            resume?.settings.layout.position === Position.TOP
                ? 'flex'
                : 'block',
                    flexDirection:
            resume?.settings.layout.position === Position.TOP
                ? 'column'
                : 'initial',
                    fontFamily: font,
                }}
            >
                {resume?.settings.layout.position === Position.TOP && (
                    <PersonalDetailsBlock />
                )}

                {resume && columns === 1 && (
                    <PageOneColumn
                        sections={resume.settings.sectionsOrder.top as Sections[]}
                        resumeArraySections={resumeArraySections}
                    />
                )}

                {columns === 2 && (
                    <PageTwoColumns
                        resumeArraySections={resumeArraySections}
                        columnWidth={columnWidth}
                    />
                )}
            </div>
        </div>
    );
});

export default Page;
