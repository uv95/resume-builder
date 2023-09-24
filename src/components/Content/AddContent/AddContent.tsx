import { contentCards, IContentCard } from '@/utils/consts/data';
import { Sections } from '@/utils/types/resumeTypes';
import { useTranslation } from 'next-i18next';
import { KeyboardEvent, memo } from 'react';
import Card from '../../UI/Card/Card';
import style from './AddContent.module.scss';

type Props = {
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddContent = ({ setContentToEdit, setOpen }: Props) => {
    const {t} = useTranslation(['content'])
    
    const onClickHandler = (card:IContentCard) => {
        setContentToEdit({
            itemId: '',
            section: card.name as Sections,
        });
        setOpen(false);
    }

    return (
        <div className={style.cards}>
            {contentCards.map((card) => (
                <Card key={card.title} gray hoverScale aria-label={t(`content-cards.${[card.name]}`)} role="button" tabIndex={0} className={style.card} onClick={() => onClickHandler(card)}
                >
                    <div className="p-2 pointer" >
                        <h3 className={style.heading}>{t(`content-cards.${[card.name]}`)}</h3>
                        <p>{t(`content-cards.${[card.name+'_description']}`)}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default memo(AddContent);
