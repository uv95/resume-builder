import { addApolloState, initializeApollo } from '@/apollo';
import Content from '@/components/Content/Content/Content';
import Navigation from '@/components/Navigation/Navigation';
import { ResumeContext } from '@/context/ResumeContext';
import { GET_RESUME } from '@/graphql/queries/resume';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import style from '../../styles/Resume.module.scss';
import ResumeName from '@/components/ResumeName';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from '@/components/ResumePage/Page/Page';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';

const Customization = dynamic(()=>import('@/components/Customization/Customization'))

const Resume = () => {
    const router = useRouter();

    const { id } = router.query;
    const { error, data } = useQuery(GET_RESUME, { variables: { id } });
    const { setResume, setContent, setSettings } = useContext(ResumeContext);
    const componentRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState('Content');

    useEffect(() => {
        if(data) {
            setResume(data.resume);
            setContent(data.resume.content)
            setSettings(data.resume.settings)
        };
    }, [data, setResume,setContent,setSettings]);

    if (error) return <p>Something Went Wrong</p>;

    return (
        <Layout title={data.resume.name} content='Resume editing and customization'>
            {data.resume &&  <div className={style.layout}>
                <div className="flex">
                    <Navigation active={active} setActive={setActive} />
                    <div className={style.mainPanel}>
                        {data && (
                            <ResumeName
                                resumeName={data.resume.name}
                                id={data.resume.id}
                                reactToPrintContent={() => componentRef.current}
                            />
                        )}
                        {active === 'Content' && <Content />}
                        {active === 'Customize' && <Customization />}
                    </div>
                </div>
                <Page ref={componentRef} /> 
            </div>}
        </Layout>
    );
};

export default Resume;

export async function getServerSideProps({ params, locale }: { params: any, locale: string }) {
    const client = initializeApollo();
    await client.query({
        query: GET_RESUME,
        variables: { id: params.id },
    });
    return addApolloState(client, {
        props: {
            ...(await serverSideTranslations(locale,[
                'content', 'common', 'customization'
            ]))
        },
    });
}
