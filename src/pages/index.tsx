import { addApolloState, initializeApollo } from '@/apollo';
import Footer from '@/components/IndexPage/Footer/Footer';
import MyResumes from '@/components/IndexPage/MyResumes/MyResumes';
import NewResume from '@/components/IndexPage/NewResume/NewResume';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Layout from '@/components/Layout';
import { Loader } from '@/components/UI/Loader/Loader';
import { ADD_RESUME } from '@/graphql/mutations/resume';
import { GET_RESUMES } from '@/graphql/queries/resume';
import { MY_RESUMES_LOCALSTORAGE_KEY } from '@/utils/consts/localStorage';
import { ILocalStorageResume } from '@/utils/types/common';
import { IResume } from '@/utils/types/resumeTypes';
import { useMutation } from '@apollo/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from '../styles/Home.module.scss';

export default function Home({resumes}: any) {
    const [addResume, { data }] = useMutation(ADD_RESUME);
    const [myResumes, setMyResumes] = useState<IResume[]>([]);
    const [myResumesLS, setMyResumesLS] = useState<ILocalStorageResume[]>([]);
   
    const router = useRouter();

    useEffect(() => {
        if (data) {
            const newResumeList = [...myResumesLS, {id: data.addResume.id, name: data.addResume.name}]
            localStorage.setItem(MY_RESUMES_LOCALSTORAGE_KEY, JSON.stringify(newResumeList));
            router.push(`resume/${data.addResume.id}`);
        }
    }, [data, router, myResumes, myResumesLS]);


    useEffect(() => {
        const myExistingResumesLS = localStorage.getItem(MY_RESUMES_LOCALSTORAGE_KEY);
        const myExistingResumes = myExistingResumesLS ? JSON.parse(myExistingResumesLS) as ILocalStorageResume[] : null;

        if(myExistingResumes && myExistingResumes.length!==0) {
            const allMyResumes = resumes.filter((item:IResume) => myExistingResumes.some((resume:ILocalStorageResume) => resume.id===item.id))
            setMyResumesLS(myExistingResumes)
            setMyResumes(allMyResumes)
        }
    }, [resumes]);

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

export async function getServerSideProps({locale}:{locale:string}) {
    const client = initializeApollo();
    const {data} = await client.query({
        query: GET_RESUMES,
    });
    return addApolloState(client, {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', [
                'common',
                'customization', 'content'
            ])),
            resumes: data.resumes
        },
    });
}
