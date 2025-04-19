import { addApolloState, initializeApollo } from "@/apollo";
import Footer from "@/components/IndexPage/Footer/Footer";
import MyResumes from "@/components/IndexPage/MyResumes/MyResumes";
import NewResume from "@/components/IndexPage/NewResume/NewResume";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Layout from "@/components/Layout";
import { Loader } from "@/components/UI/Loader/Loader";
import { ADD_RESUME } from "@/graphql/mutations/resume";
import { GET_RESUMES } from "@/graphql/queries/resume";
import { MY_RESUMES_LOCALSTORAGE_KEY } from "@/utils/consts/localStorage";
import { IResume } from "@/utils/types/resumeTypes";
import { useMutation } from "@apollo/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import style from "../styles/Home.module.scss";
import useResumes from "@/hooks/useResumes";

export default function Home({ resumes }: { resumes: IResume[] }) {
    const [addResume, { data, error: mutationError }] = useMutation(ADD_RESUME);
    const { myResumes, myResumesLS } = useResumes(resumes);
    const router = useRouter();

    const handleNewResume = useCallback(async () => {
        try {
            await addResume();
        } catch (error) {
            console.error("Error creating new resume:", error);
        }
    }, [addResume]);

    useEffect(() => {
        if (data?.addResume) {
            const { id, name } = data.addResume;
            const newResumeList = [...myResumesLS, { id, name }];
            localStorage.setItem(
                MY_RESUMES_LOCALSTORAGE_KEY,
                JSON.stringify(newResumeList)
            );
            router.push(`resume/${id}`);
        }
    }, [data, router, myResumesLS]);

    const filteredResumes = useMemo(
        () => myResumes.filter((resume) => resume.id),
        [myResumes]
    );

    if (mutationError) {
        console.error("Mutation error:", mutationError);
    }

    return (
        <>
            <Loader />
            <Layout title="Resume Builder" content="Build your resume">
                <LanguageSwitcher className={style.langSwitcher} />
                <div className={style.content}>
                    <NewResume addResume={handleNewResume} />
                    <MyResumes myResumes={filteredResumes} />
                </div>
            </Layout>
            <Footer />
        </>
    );
}

export async function getServerSideProps({ locale }: { locale: string }) {
    const client = initializeApollo();

    try {
        const { data } = await client.query({
            query: GET_RESUMES,
        });

        return addApolloState(client, {
            props: {
                ...(await serverSideTranslations(locale ?? "en", [
                    "common",
                    "customization",
                    "content",
                ])),
                resumes: data.resumes,
            },
        });
    } catch (error) {
        return {
            props: {
                resumes: [],
            },
        };
    }
}
