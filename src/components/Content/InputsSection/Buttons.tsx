import Button from '@/components/Button/Button';
import Image from 'next/image';
import React from 'react';
import style from './InputsSection.module.scss';
import save from '../../../icons/check.svg';
import trash from '../../../icons/trash.svg';
import { FetchResult } from '@apollo/client';
import { Sections } from '@/utils/types/resumeTypes';
import { useTranslation } from 'next-i18next';

type Props = {
  inputData: any;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  deleteContent: (
    itemId: string
  ) => Promise<
    FetchResult<any, Record<string, any>, Record<string, any>>
  > | null;
  itemId: string;
};

const Buttons = ({
    inputData,
    setContentToEdit,
    deleteContent,
    itemId,
}: Props) => {
    const {t} = useTranslation(['content'])

    return (
        <div className={style.buttons}>
            {inputData.name !== Sections.PERSONAL_DETAILS && (
                <Button
                    btnType="white"
                    isBold
                    onClick={() => {
                        deleteContent(itemId);
                        setContentToEdit({ section: '', itemId: '' });
                    }}
                >
                    <div className="flex gap-1 aligned">
                        <Image src={trash} width="18" height="18" alt="trash" />
                        <p>{t('delete')}</p>
                    </div>
                </Button>
            )}
            <div className="flex rightPositioned">
                <Button
                    btnType="white"
                    isBold
                    onClick={() => {
                        setContentToEdit({ section: '', itemId: '' });
                    }}
                >
                    {t('cancel')}
                </Button>
                <Button isSubmit btnType="pink" isBold>
                    <div className="flex gap-1 aligned">
                        <Image
                            src={save}
                            width="20"
                            height="20"
                            alt="save"
                            style={{ filter: 'invert()' }}
                        />
                        <p>{t('save')}</p>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default Buttons;
