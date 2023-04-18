import { addApolloState, initializeApollo } from '@/apollo';
import Button from '@/components/Button/Button';
import { ADD_RESUME } from '@/graphql/mutations/resumeMutations';
import { GET_RESUMES } from '@/graphql/queries/resumeQuery';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from '../styles/Home.module.scss';

export default function Home() {
  const [addResume, { data }] = useMutation(ADD_RESUME);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  // const { loading, error, data } = useQuery(GET_RESUMES);
  const router = useRouter();
  const createResume = () => {
    addResume();
    if (data) {
      localStorage.setItem('resumeId', data.addResume.id);
      localStorage.setItem('resumeName', data.addResume.name);
      router.push(`resume/${data.addResume.id}`);
    }
  };

  useEffect(() => {
    setResumeId(localStorage.getItem('resumeId') || null);
    setResumeName(localStorage.getItem('resumeName') || null);
  }, []);

  return (
    <main className={style.home}>
      <div className="flex">
        <Button onClick={createResume} text="Create Resume" color="pink" />
        {resumeId && (
          <Button
            onClick={() => router.push(`resume/${resumeId}`)}
            text={`Continue editing ${resumeName}`}
            color="pink"
          />
        )}
      </div>
    </main>
  );
}

// export async function getStaticProps() {
//   const client = initializeApollo();
//   await client.query({
//     query: GET_RESUMES,
//   });
//   return addApolloState(client, {
//     props: {},
//   });
// }
