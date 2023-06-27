import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Button from '../Button/Button';
import Card from '../Card/Card';
import englishFlag from '../../icons/gb.svg';
import russianFlag from '../../icons/ru.svg';
import { useRouter } from 'next/router'

const LanguageSwitcher = () => {
    const router = useRouter()
    const {t,i18n} = useTranslation()

    const onToggleLanguageClick = (newLocale: string) => {
        const { pathname, asPath, query } = router
        router.push({ pathname, query }, asPath, { locale: newLocale })
    }

    const changeTo = router.locale === 'en' ? 'ru' : 'en'

    return (
        <Card>
            <div className="p-2">
                <Button
                    btnType="nav"
                    onClick={() =>onToggleLanguageClick(changeTo)}
                >
                    <div className="flex aligned">
                        <Image src={i18n.language === 'ru' ? russianFlag : englishFlag} width='20' height='20' alt='country flag'/>
                        <p>{t('lang')}</p>
                    </div>
                </Button>
            </div>
        </Card>
    )
}

export default LanguageSwitcher