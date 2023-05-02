import { CurrentSectionProvider } from '@/context/CurrentSectionContext';
import { resumeStore } from '@/store';
import { contentCards, inputData } from '@/utils/data';
import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  IResume,
  ISkills,
} from '@/utils/types';
import React, { useEffect, useState } from 'react';
import AddContent from '../AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import InputsSection from '../InputsSection/InputsSection';
import Modal from '../Modal/Modal';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import ResumeName from '../ResumeName/ResumeName';
import style from './MainPanel.module.scss';

type Props = { resume: IResume };

interface IResumeOptionalFields {
  language: ILanguage[];
  skills: ISkills[];
  professionalExperience: IProfessionalExperience[];
  project: IProject[];
  education: IEducation[];
  profile: IProfile[];
}

const MainPanel = ({ resume }: Props) => {
  const { sectionsOrder } = resumeStore;

  const [showAddContent, setShowAddContent] = useState(false);
  const [contentToEdit, setContentToEdit] = useState({
    section: '',
    itemId: '',
  });

  const [resumeOptionalFields, setResumeOptionalFields] =
    useState<IResumeOptionalFields>({
      language: [],
      skills: [],
      professionalExperience: [],
      project: [],
      education: [],
      profile: [],
    });

  useEffect(() => {
    setResumeOptionalFields({
      language: resume.language,
      skills: resume.skills,
      professionalExperience: resume.professionalExperience,
      project: resume.project,
      education: resume.education,
      profile: resume.profile,
    });
  }, [resume]);

  return (
    <CurrentSectionProvider>
      <div className={style.mainPanel}>
        <div className="flex-column">
          <ResumeName resumeName={resume.name} id={resume.id} />
          {(!contentToEdit.section ||
            contentToEdit.section === 'personalDetails') && (
            <PersonalDetails
              resume={resume}
              contentToEdit={contentToEdit}
              setContentToEdit={setContentToEdit}
            />
          )}
          {!contentToEdit.section &&
            contentToEdit.section !== 'personalDetails' &&
            sectionsOrder.map(
              (section) =>
                resumeOptionalFields[
                  section as keyof typeof resumeOptionalFields
                ].length !== 0 && (
                  <ContentCard
                    resume={resume}
                    contentToEdit={contentToEdit}
                    key={section}
                    setContentToEdit={setContentToEdit}
                    inputData={inputData[section as keyof typeof inputData]}
                    resumeData={resume[section as keyof typeof resume]}
                  />
                )
            )}

          {contentToEdit.section &&
            contentToEdit.section !== 'personalDetails' && (
              <Card>
                <InputsSection
                  itemId={contentToEdit.itemId}
                  inputData={
                    inputData[contentToEdit.section as keyof typeof inputData]
                  }
                  resume={resume}
                  setContentToEdit={setContentToEdit}
                />
              </Card>
            )}
          {!contentToEdit.section && (
            <div className="centered">
              <Button
                onClick={() => setShowAddContent(true)}
                color="pink"
                text="+ Add Content"
              />
            </div>
          )}
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
    </CurrentSectionProvider>
  );
};

export default MainPanel;
