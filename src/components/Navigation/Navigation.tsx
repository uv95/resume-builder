
import { useTranslation } from 'next-i18next';
import Button from '../Button/Button';
import Card from '../Card/Card';
import LanguageSwitcher from './LanguageSwitcher';

type Props = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const Navigation = ({ active, setActive }: Props) => {
    const {t} = useTranslation()
    return (
        <div className='flex flex-column'>
            <Card>
                <div className="flex-column p-2">
                    <Button
                        btnType="nav"
                        isActive={active === 'Content'}
                        onClick={() => setActive('Content')}
                    >
                        {t('content')}
                    </Button>
                    <Button
                        btnType="nav"
                        isActive={active === 'Customize'}
                        onClick={() => setActive('Customize')}
                    >
                        {t('customize')}
                    </Button>
                </div>
            </Card>
            <LanguageSwitcher/>
        </div>
    );
};

export default Navigation;
