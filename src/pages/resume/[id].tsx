import { addApolloState, initializeApollo } from '@/apollo';
import Content from '@/components/Content/Content/Content';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation/Navigation';
import { ResumeDataSetter } from '@/providers/ResumeDataSetter/ResumeDataSetter';
import ResumeName from '@/components/ResumeName';
import Page from '@/components/ResumePage/Page/Page';
import { Loader } from '@/components/UI/Loader/Loader';
import { GET_RESUME } from '@/graphql/queries/resume';
import { useQuery } from '@apollo/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import style from '../../styles/Resume.module.scss';
import { Providers } from '@/providers/Providers';

const Customization = dynamic(() => import('@/components/Customization/Customization'))

const Resume = () => {
    const router = useRouter();
    const { id } = router.query;
    const { error, data } = useQuery(GET_RESUME, { variables: { id } });
    const componentRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState('Content');
    
    if (error) return <p>Something Went Wrong</p>;

    return (
        <Layout title={data?.resume?.name || 'Loading...'} content='Resume editing and customization'>
            <Loader/>
            <Providers>
                <div className={style.layout}>
                    {data.resume && <ResumeDataSetter resumeData={data.resume}>
                        <div className="flex">
                            <Navigation active={active} setActive={setActive} />
                            <div className={style.mainPanel}>
                                <ResumeName
                                    resumeName={data?.resume?.name}
                                    id={data?.resume?.id}
                                    reactToPrintContent={() => componentRef.current}
                                />
                                {active === 'Content' && <Content />}
                                {active === 'Customize' && <Customization />}
                            </div>
                        </div>
                        <Page ref={componentRef} /> 
                    </ResumeDataSetter>}
                </div>
            </Providers>
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
            ...(await serverSideTranslations(locale, [
                'content', 'common', 'customization'
            ]))
        },
    });
}
