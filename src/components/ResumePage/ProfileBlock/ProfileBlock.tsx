import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import parse from 'html-react-parser';

const ProfileBlock = () => {
    const { resume } = useContext(ResumeContext);
    const content = resume?.content.profile.items;

    return (
        <>
            {content &&
        content.map((item) => <div key={item.id}>{parse(item.text)}</div>)}
        </>
    );
};

export default ProfileBlock;
