import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';

type Props = {};

const ProfileBlock = (props: Props) => {
  const { resume } = useContext(ResumeContext);
  const content = resume?.content.profile;

  return (
    <div className="p-2 longText">
      {content && content.map((item) => <p key={item.id}>{item.text}</p>)}
    </div>
  );
};

export default ProfileBlock;
