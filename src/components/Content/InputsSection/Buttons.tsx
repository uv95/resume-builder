import Button from '@/components/Button/Button';
import Image from 'next/image';
import React from 'react';
import style from './InputsSection.module.scss';
import save from '../../../icons/check.svg';
import trash from '../../../icons/trash.svg';
import { FetchResult } from '@apollo/client';

type Props = {
  inputData: any;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: string;
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
  return (
    <div className={style.buttons}>
      {inputData.name !== 'personalDetails' && (
        <Button
          type="white"
          bold
          onClick={() => {
            deleteContent(itemId);
            setContentToEdit({ section: '', itemId: '' });
          }}
        >
          <div className="flex gap-1 aligned">
            <Image src={trash} width="18" height="18" alt="trash" />
            <p>Delete</p>
          </div>
        </Button>
      )}
      <div className="flex rightPositioned">
        <Button
          type="white"
          bold
          onClick={() => {
            setContentToEdit({ section: '', itemId: '' });
          }}
        >
          Cancel
        </Button>
        <Button submit type="pink" bold>
          <div className="flex gap-1 aligned">
            <Image
              src={save}
              width="20"
              height="20"
              alt="save"
              style={{ filter: 'invert()' }}
            />
            <p>Save</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
