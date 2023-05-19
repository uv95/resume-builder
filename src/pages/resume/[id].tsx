import { addApolloState, initializeApollo } from '@/apollo';
import Customization from '@/components/Customization/Customization';
import Content from '@/components/Content/Content';
import Navigation from '@/components/Navigation/Navigation';
import ResumePage from '@/components/ResumePage/ResumePage';
import { ResumeContext } from '@/context/ResumeContext';
import { GET_RESUME } from '@/graphql/queries/resumeQuery';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import style from '../../styles/Resume.module.scss';
import ResumeName from '@/components/ResumeName';

type Props = {};

const Resume = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { error, data } = useQuery(GET_RESUME, { variables: { id } });
  const { setResume } = useContext(ResumeContext);

  const [active, setActive] = useState('Content');

  useEffect(() => {
    data && setResume(data.resume);
  }, [data, setResume]);

  if (error) return <p>Something Went Wrong</p>;

  return (
    <main>
      <div className={style.layout}>
        <div className="flex">
          <Navigation active={active} setActive={setActive} />
          <div className={style.mainPanel}>
            <ResumeName resumeName={data.resume.name} id={data.resume.id} />
            {active === 'Content' && <Content />}
            {active === 'Customize' && <Customization />}
          </div>
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
