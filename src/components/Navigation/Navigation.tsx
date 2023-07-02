import { useTranslation } from 'next-i18next';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import LanguageSwitcher from '../LanguageSwitcher';
import back from '../../icons/arrow-left.svg'
import style from './Navigation.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const Navigation = ({ active, setActive }: Props) => {
    const router = useRouter();
    const {t} = useTranslation()

    return (
        <div className={style.navigation}>
            <Card className={style.main}>
                <Button
                    className={style.backBtn}
                    btnType="nav"
                    onClick={() => router.push('/')}
                >
                    <Image src={back} alt='back' width='20' height='20'/>
                </Button>
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
            </Card>
            <LanguageSwitcher/>
        </div>
    );
};

export default Navigation;
