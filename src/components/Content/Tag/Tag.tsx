import style from './Tag.module.scss';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

type Props = { text: string; onClick: () => void;
    tagsGroup: string;
};

const Tag = ({ text, onClick, tagsGroup }: Props) => {
    const {t} = useTranslation(['content'])

    return (
        <div className={style.tag} onClick={onClick}>
            <b>+</b>
            <p>{tagsGroup==='Links' ? text : (t('additionalInfo', {returnObjects:true}) as any)[text]}</p>
        </div>
    );
};

export default memo(Tag);
