import { addApolloState, initializeApollo } from '@/apollo';
import { ADD_RESUME } from '@/graphql/mutations/resume';
import { GET_RESUMES } from '@/graphql/queries/resume';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from '../styles/Home.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import NewResume from '@/components/IndexPage/NewResume/NewResume';
import MyResumes from '@/components/IndexPage/MyResumes/MyResumes';
import { IResume } from '@/utils/types/resumeTypes';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/IndexPage/Footer/Footer';
import Layout from '@/components/Layout';
import { Loader } from '@/components/UI/Loader/Loader';

export default function Home() {
    const [addResume, { data}] = useMutation(ADD_RESUME);
    const [myResumes, setMyResumes] = useState<IResume[]>([]);
    const [myResumesLS, setMyResumesLS] = useState<{id:string,name:string}[]>([]);

    const {  data: allResumes } = useQuery(GET_RESUMES);
    const router = useRouter();

    useEffect(() => {
        if (data) {
            const newResumeList = [...myResumesLS, {id: data.addResume.id, name: data.addResume.name}]
            localStorage.setItem('myResumes', JSON.stringify(newResumeList));
            router.push(`resume/${data.addResume.id}`);
        }
    }, [data, router,myResumes,myResumesLS]);


    useEffect(() => {
        const myExistingResumesLS = localStorage.getItem("myResumes");
        const myExistingResumes = myExistingResumesLS ? JSON.parse(myExistingResumesLS) as {id:string,name:string}[] : null;

        if(myExistingResumes&&myExistingResumes.length!==0) {
            const allMyResumes = allResumes.resumes.filter((item:IResume)=>myExistingResumes.some((resume:{id:string,name:string})=>resume.id===item.id))
            setMyResumesLS(myExistingResumes)
            setMyResumes(allMyResumes)
        }
    }, [allResumes.resumes]);

    return (
        <>
            <Loader/>
            <Layout title='Resume Builder' content='Build your resume'>
                <LanguageSwitcher className={style.langSwitcher}/>
                <div className={style.content}>
                    <NewResume addResume={addResume}/>
                    <MyResumes myResumes={myResumes}/>
                </div>
            </Layout>
            <Footer/>
        </>
    )
}

export async function getStaticProps({locale}:{locale:string}) {
    const client = initializeApollo();
    await client.query({
        query: GET_RESUMES,
    });
    return addApolloState(client, {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', [
                'common',
                'customization', 'content'
            ]))
        },
    });
}
