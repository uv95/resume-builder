import React from 'react';
import Card from '../../Card/Card';

type Props = { title: string; children: React.ReactNode };

const SettingsCard = ({ title, children }: Props) => {
    return (
        <Card>
            <div className="p-2">
                <h3>{title}</h3>
                <div className="flex-column mt-2">{children}</div>
            </div>
        </Card>
    );
};

export default SettingsCard;
