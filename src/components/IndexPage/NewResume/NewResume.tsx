import Button from '@/components/UI/Button/Button';
import style from './NewResume.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {addResume: ()=>void}

const NewResume = ({addResume}: Props) => {
    const {t} = useTranslation()
   
    return (
        <Button className={style.newResume} onClick={addResume} btnType="pink" isBold>
            {t('new-resume')}
        </Button>
    )
}

export default NewResume