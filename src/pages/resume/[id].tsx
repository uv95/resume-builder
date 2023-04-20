import { addApolloState, initializeApollo } from '@/apollo';
import MainPanel from '@/components/MainPanel/MainPanel';
import Navigation from '@/components/Navigation/Navigation';
import ResumePage from '@/components/ResumePage/ResumePage';
import { GET_RESUME } from '@/graphql/queries/resumeQuery';
import { ApolloError, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import style from '../../styles/Resume.module.scss';

type Props = {};

const Resume = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_RESUME, { variables: { id } });

  if (error) return <p>Something Went Wrong</p>;

  return (
    <main>
      <div className={style.layout}>
        <div className="flex">
          <Navigation />
          <MainPanel resume={data.resume} />
        </div>
        <ResumePage />
      </div>
    </main>
  );
};

export default Resume;

export async function getServerSideProps({ params }: { params: any }) {
  const client = initializeApollo();
  await client.query({
    query: GET_RESUME,
    variables: { id: params.id },
  });

  return addApolloState(client, {
    props: {},
  });
}
