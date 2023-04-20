import { personalDetailInputData } from '@/utils/data';
import { IPersonalDetails } from '@/utils/types';
import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import style from './PersonalDetails.module.scss';

type Props = { content: IPersonalDetails | null };

const PersonalDetails = ({ content }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card>
      {isEdit ? (
        <InputsSection
          content={personalDetailInputData}
          // isEdit={isEdit}
          // setIsEdit={setIsEdit}
        />
      ) : (
        <div className={style.cardContainer} onClick={() => setIsEdit(true)}>
          <div className="flex spaceBetween p-2">
            <p
              className={`${style.name} ${
                !content?.fullName ? style.empty : ''
              }`}
            >
              {content?.fullName || 'Your name'}
            </p>
            <p onClick={() => setIsEdit(true)}>EDIT</p>
          </div>
          <div className={style.content}>
            <p
              className={`${style.input} ${!content?.email ? style.empty : ''}`}
            >
              {content?.email || 'Email'}
            </p>
            <p
              className={`${style.input} ${!content?.phone ? style.empty : ''}`}
            >
              {content?.phone || 'Phone'}
            </p>
            <p
              className={`${style.input} ${
                !content?.address ? style.empty : ''
              }`}
            >
              {content?.address || 'Address'}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PersonalDetails;
