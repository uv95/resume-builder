import { personalDetailInputData } from '@/utils/data';
import { IResume } from '@/utils/types';
import React from 'react';
import Card from '../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import style from './PersonalDetails.module.scss';

type Props = {
  resume: IResume;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: string;
      itemId: string;
    }>
  >;
  contentToEdit: {
    section: string;
    itemId: string;
  };
};

const PersonalDetails = ({
  resume,
  setContentToEdit,
  contentToEdit,
}: Props) => {
  return (
    <Card>
      {contentToEdit.section ? (
        <InputsSection
          itemId={contentToEdit.itemId}
          inputData={personalDetailInputData}
          resume={resume}
          setContentToEdit={setContentToEdit}
        />
      ) : (
        <div
          className={style.cardContainer}
          onClick={() =>
            setContentToEdit((prev) => ({
              ...prev,
              section: 'personalDetails',
            }))
          }
        >
          <div className="flex spaceBetween p-2">
            <p
              className={`${style.name} ${
                !resume.personalDetails?.fullName ? style.empty : ''
              }`}
            >
              {resume.personalDetails?.fullName || 'Your name'}
            </p>
            <p
              onClick={() =>
                setContentToEdit((prev) => ({
                  ...prev,
                  section: 'personalDetails',
                }))
              }
            >
              EDIT
            </p>
          </div>
          <div className={style.content}>
            <p
              className={`${style.input} ${
                !resume.personalDetails?.email ? style.empty : ''
              }`}
            >
              {resume.personalDetails?.email || 'Email'}
            </p>
            <p
              className={`${style.input} ${
                !resume.personalDetails?.phone ? style.empty : ''
              }`}
            >
              {resume.personalDetails?.phone || 'Phone'}
            </p>
            <p
              className={`${style.input} ${
                !resume.personalDetails?.address ? style.empty : ''
              }`}
            >
              {resume.personalDetails?.address || 'Address'}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PersonalDetails;
