import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import parse from 'html-react-parser';

type Props = {};

const ProfileBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.profile;

  return (
    <>
      {content &&
        content.map((item) => <div key={item.id}>{parse(item.text)}</div>)}
    </>
  );
};

export default ProfileBlock;
