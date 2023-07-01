import style from './PageError.module.scss';
import { useTranslation } from 'next-i18next';
import Button from '../UI/Button/Button';
import { useRouter } from 'next/router'

const PageError = () => {
    const {t} = useTranslation()
    const router = useRouter()
    
    const reloadPage = ()=>router.reload()

    return (
        <div className={style.pageError}>
            <div className={style.content}>
                <h1>{t('page-error')}</h1>
                <Button className={style.reloadButton} btnType='pink' onClick={reloadPage}>
                    {t('reload')}
                </Button>
               
            </div>
        </div>
    )
}


export default PageError