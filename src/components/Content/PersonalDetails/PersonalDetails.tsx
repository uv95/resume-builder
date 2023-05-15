import { ResumeContext } from '@/context/ResumeContext';
import { personalDetailInputData } from '@/utils/data';
import React, { useContext } from 'react';
import Card from '../../Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import style from './PersonalDetails.module.scss';

type Props = {
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

const PersonalDetails = ({ setContentToEdit, contentToEdit }: Props) => {
  const { resume } = useContext(ResumeContext);

  return (
    <Card>
      {contentToEdit.section ? (
        <InputsSection
          itemId={contentToEdit.itemId}
          inputData={personalDetailInputData}
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
                !resume?.content.personalDetails?.fullName ? style.empty : ''
              }`}
            >
              {resume?.content.personalDetails?.fullName || 'Your name'}
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
                !resume?.content.personalDetails?.email ? style.empty : ''
              }`}
            >
              {resume?.content.personalDetails?.email || 'Email'}
            </p>
            <p
              className={`${style.input} ${
                !resume?.content.personalDetails?.phone ? style.empty : ''
              }`}
            >
              {resume?.content.personalDetails?.phone || 'Phone'}
            </p>
            <p
              className={`${style.input} ${
                !resume?.content.personalDetails?.address ? style.empty : ''
              }`}
            >
              {resume?.content.personalDetails?.address || 'Address'}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PersonalDetails;
