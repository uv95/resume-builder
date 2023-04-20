import { personalDetailInputData } from '@/utils/data';
import { IPersonalDetails } from '@/utils/types';
import React from 'react';
import Card from '../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import style from './PersonalDetails.module.scss';

type Props = {
  content: IPersonalDetails | null;
  setContentToEdit: React.Dispatch<React.SetStateAction<string | null>>;
  contentToEdit: string | null;
};

const PersonalDetails = ({
  content,
  setContentToEdit,
  contentToEdit,
}: Props) => {
  return (
    <Card>
      {contentToEdit ? (
        <InputsSection
          inputData={personalDetailInputData}
          setContentToEdit={setContentToEdit}
        />
      ) : (
        <div
          className={style.cardContainer}
          onClick={() => setContentToEdit('personalDetails')}
        >
          <div className="flex spaceBetween p-2">
            <p
              className={`${style.name} ${
                !content?.fullName ? style.empty : ''
              }`}
            >
              {content?.fullName || 'Your name'}
            </p>
            <p onClick={() => setContentToEdit('personalDetails')}>EDIT</p>
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
