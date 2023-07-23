import { contentCards } from '@/utils/data';
import { Sections } from '@/utils/types/resumeTypes';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
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
    const {t, i18n} = useTranslation(['content'])
    return (
        <div className={style.cards}>
            {contentCards.map((card) => (
                <Card key={card.title} gray hoverScale>
                    <div
                        className="p-2 pointer"
                        onClick={() => {
                            setContentToEdit({
                                itemId: '',
                                section: card.name as Sections,
                            });
                            setOpen(false);
                        }}
                    >
                        <h3 className={style.heading}>{(t('content-cards', {returnObjects:true})as any)[card.name]}</h3>
                        <p>{(t('content-cards', {returnObjects:true})as any)[card.name+'_description']}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default memo(AddContent);
