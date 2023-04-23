import { contentCards, inputData } from '@/utils/data';
import { IResume } from '@/utils/types';
import React, { useState } from 'react';
import AddContent from '../AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import Modal from '../Modal/Modal';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import ResumeName from '../ResumeName/ResumeName';
import style from './MainPanel.module.scss';

type Props = { resume: IResume };

const MainPanel = ({ resume }: Props) => {
  const [showAddContent, setShowAddContent] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<string | null>(null);
  const [resumeOptionalFields] = useState({
    language: resume.language,
    skills: resume.skills,
    professionalExperience: resume.professionalExperience,
    project: resume.project,
    education: resume.education,
    profile: resume.profile,
  });

  return (
    <>
      <div className={style.mainPanel}>
        <div className="flex-column">
          <ResumeName resumeName={resume.name} id={resume.id} />
          {(!contentToEdit || contentToEdit === 'personalDetails') && (
            <PersonalDetails
              content={resume.personalDetails}
              contentToEdit={contentToEdit}
              setContentToEdit={setContentToEdit}
            />
          )}
          {!contentToEdit &&
            contentToEdit !== 'personalDetails' &&
            contentCards.map(
              (contentCard) =>
                resumeOptionalFields[
                  contentCard.name as keyof typeof resumeOptionalFields
                ].length !== 0 && (
                  <ContentCard
                    key={contentCard.name}
                    setContentToEdit={setContentToEdit}
                    inputData={
                      inputData[contentCard.name as keyof typeof inputData]
                    }
                    resumeData={resume[contentCard.name as keyof typeof resume]}
                  />
                )
            )}
          {contentToEdit && contentToEdit !== 'personalDetails' && (
            <ContentCard
              contentToEdit={contentToEdit}
              setContentToEdit={setContentToEdit}
              inputData={inputData[contentToEdit as keyof typeof inputData]}
              resumeData={resume[contentToEdit as keyof typeof resume]}
            />
          )}
          <div className="centered">
            <Button
              onClick={() => setShowAddContent(true)}
              color="pink"
              text="+ Add Content"
            />
          </div>
        </div>
      </div>
      {showAddContent && (
        <Modal setOpen={setShowAddContent} heading="Add Content">
          <AddContent
            setContentToEdit={setContentToEdit}
            setOpen={setShowAddContent}
          />
        </Modal>
      )}
    </>
  );
};

export default MainPanel;
