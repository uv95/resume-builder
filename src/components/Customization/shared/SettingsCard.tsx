import { memo } from 'react';
import Card from '../../UI/Card/Card';

type Props = { title: string; children: React.ReactNode };

const SettingsCard = ({ title, children }: Props) => {
    return (
        <Card className='p-2'>
            <h3>{title}</h3>
            <div className="flex-column mt-2">{children}</div>
        </Card>
    );
};

export default memo(SettingsCard);
