import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Button from './UI/Button/Button';
import englishFlag from '../icons/gb.svg';
import russianFlag from '../icons/ru.svg';
import { useRouter } from 'next/router'
import { memo } from 'react';

type Props = {className?:string}

const LanguageSwitcher = ({className}:Props) => {
    const router = useRouter()
    const {t,i18n} = useTranslation()

    const onToggleLanguageClick = (newLocale: string) => {
        const { pathname, asPath, query } = router
        router.push({ pathname, query }, asPath, { locale: newLocale })
    }

    const changeTo = router.locale === 'en' ? 'ru' : 'en'

    return (
        <Button
            className={className}
            btnType="nav"
            onClick={() =>onToggleLanguageClick(changeTo)}
        >
            <div className="flex aligned gap-1">
                <Image src={i18n.language === 'ru' ? russianFlag : englishFlag} width='20' height='20' alt='country flag'/>
                <p>{t('lang')}</p>
            </div>
        </Button>  
    )
}

export default memo(LanguageSwitcher)