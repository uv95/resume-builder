import { addApolloState, initializeApollo } from '@/apollo';
import Customization from '@/components/Customization/Customization';
import Content from '@/components/Content/Content';
import Navigation from '@/components/Navigation/Navigation';
import Page from '@/components/ResumePage/Page';
import { ResumeContext } from '@/context/ResumeContext';
import { GET_RESUME } from '@/graphql/queries/resume';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, {
  ForwardedRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import style from '../../styles/Resume.module.scss';
import ResumeName from '@/components/ResumeName';

type Props = {};

const Resume = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { error, data } = useQuery(GET_RESUME, { variables: { id } });
  const { resume, setResume } = useContext(ResumeContext);

  const componentRef = useRef<HTMLDivElement>(null);

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
