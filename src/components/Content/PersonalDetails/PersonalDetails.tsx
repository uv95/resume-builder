import { ResumeContext } from '@/context/ResumeContext';
import { personalDetailInputData } from '@/utils/data';
import React, { useContext } from 'react';
import Card from '../../UI/Card/Card';
import InputsSection from '../InputsSection/InputsSection';
import style from './PersonalDetails.module.scss';
import emailIcon from '../../../icons/email_regular.svg';
import phoneIcon from '../../../icons/phone_regular.svg';
import location from '../../../icons/location_regular.svg';
import edit from '../../../icons/edit.svg';
import Image from 'next/image';
import { Sections } from '@/utils/types/resumeTypes';
import { useTranslation } from 'next-i18next';

type Props = {
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  contentToEdit: {
    section: Sections | '';
    itemId: string;
  };
};

const PersonalDetails = ({ setContentToEdit, contentToEdit }: Props) => {
    const {t} = useTranslation(['content'])
   
    const { content } = useContext(ResumeContext);
    const { address, email, phone, fullName } = content?.personalDetails! || '';

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
                            section: Sections.PERSONAL_DETAILS,
                        }))
                    }
                >
                    <div className="flex spaceBetween p-2">
                        <p className={`${style.name} ${!fullName ? style.empty : ''}`}>
                            {fullName || t('your-name')}
                        </p>
                        <Image
                            src={edit}
                            width="20"
                            height="20"
                            alt="edit"
                            onClick={() =>
                                setContentToEdit((prev) => ({
                                    ...prev,
                                    section: Sections.PERSONAL_DETAILS,
                                }))
                            }
                        />
                    </div>
                    <div className={style.content}>
                        <div className="flex gap-1">
                            <Image
                                src={emailIcon}
                                width="20"
                                height="20"
                                alt="email"
                                style={{ filter: `contrast(${email ? 1 : 0})` }}
                            />
                            <p className={`${style.input} ${!email ? style.empty : ''}`}>
                                {email || 'Email'}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <Image
                                src={phoneIcon}
                                width="20"
                                height="20"
                                alt="phone"
                                style={{ filter: `contrast(${phone ? 1 : 0})` }}
                            />
                            <p className={`${style.input} ${!phone ? style.empty : ''}`}>
                                {phone || t('phone')}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <Image
                                src={location}
                                width="20"
                                height="20"
                                alt="location"
                                style={{ filter: `contrast(${address ? 1 : 0})` }}
                            />
                            <p className={`${style.input} ${!address ? style.empty : ''}`}>
                                {address || t('address')}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default PersonalDetails;
