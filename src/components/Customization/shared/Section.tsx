import React, { memo } from 'react';

type Props = { title: string; children: React.ReactNode };

const Section = ({ title, children }: Props) => {
    return (
        <div>
            <h5 style={{ marginBottom: '1rem' }}>{title}</h5>
            {children}
        </div>
    );
};

export default memo(Section);
