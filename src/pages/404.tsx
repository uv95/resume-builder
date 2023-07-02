import Button from '@/components/UI/Button/Button';
import Link from 'next/link'
import style from '../styles/NotFound.module.scss';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NotFound = () => {
    const {t} = useTranslation()

    return (
        <div className={style.notFound}>
            <div className={style.content}>
                <h1>{t('page-not-found')}</h1>
                <Link href='/'>
                    <Button className={style.backButton} btnType='pink'>
                        {t('back-to-main')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound

export async function getStaticProps({locale}:{locale:string}) {
    return {
        props: { ...(await serverSideTranslations(locale ?? 'en', ['common']))
        },
    }
}