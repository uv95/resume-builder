import { addApolloState, initializeApollo } from '@/apollo';
import Button from '@/components/Button/Button';
import { ADD_RESUME } from '@/graphql/mutations/resume';
import { GET_RESUMES } from '@/graphql/queries/resume';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from '../styles/Home.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
    const [addResume, { data }] = useMutation(ADD_RESUME);
    const [resumeId, setResumeId] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string | null>(null);

    // const { loading, error, data } = useQuery(GET_RESUMES);
    const router = useRouter();

    useEffect(() => {
        if (data) {
            localStorage.setItem('resumeId', data.addResume.id);
            localStorage.setItem('resumeName', data.addResume.name);
            router.push(`resume/${data.addResume.id}`);
        }
    }, [data, router]);
    useEffect(() => {
        setResumeId(localStorage.getItem('resumeId') || null);
        setResumeName(localStorage.getItem('resumeName') || null);
    }, []);

    return (
        <main className={style.home}>
            <div className="flex">
                <Button onClick={() => addResume()} btnType="pink">
                    Create Resume
                </Button>
                {resumeId && (
                    <Button
                        onClick={() => router.push(`resume/${resumeId}`)}
                        btnType="pink"
                    >{`Continue editing ${resumeName}`}</Button>
                )}
            </div>
        </main>
    );
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
