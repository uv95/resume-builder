import { AdditionalInfoProvider } from '@/context/AdditionalInfoContext';
import { CurrentSectionProvider } from '@/context/CurrentSectionContext';
import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/data';
import { IResumeArraySections, Sections } from '@/utils/types/resumeTypes';
import React, { useContext, useEffect, useState } from 'react';
import AddContent from './AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from './ContentCard/ContentCard';
import InputsSection from './InputsSection/InputsSection';
import Modal from '../Modal/Modal';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { getSectionIcon } from '@/utils/getSectionIcon';

const Content = () => {
  const [showAddContent, setShowAddContent] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<{
    section: Sections | '';
    itemId: string;
  }>({
    section: '',
    itemId: '',
  });
  const { resume } = useContext(ResumeContext);

  const [resumeArraySections, setResumeArraySections] =
    useState<IResumeArraySections>({
      language: [],
      skills: [],
      professionalExperience: [],
      project: [],
      education: [],
      profile: [],
    });

  useEffect(() => {
    resume &&
      setResumeArraySections({
        language: resume.content.language,
        skills: resume.content.skills,
        professionalExperience: resume.content.professionalExperience,
        project: resume.content.project,
        education: resume.content.education,
        profile: resume.content.profile,
      });
  }, [resume]);

  const showPersonalDetailsIfNotEditingAnything =
    !contentToEdit.section ||
    contentToEdit.section === Sections.PERSONAL_DETAILS;
  const isEditOtherSection =
    contentToEdit.section &&
    contentToEdit.section !== Sections.PERSONAL_DETAILS;

  return (
    <AdditionalInfoProvider>
      <CurrentSectionProvider>
        {resume && (
          <>
            {showPersonalDetailsIfNotEditingAnything && (
              <PersonalDetails
                contentToEdit={contentToEdit}
                setContentToEdit={setContentToEdit}
              />
            )}
            {!contentToEdit.section &&
              resume.settings.sectionsOrder.top.map(
                (section) =>
                  resumeArraySections[
                    section as keyof typeof resumeArraySections
                  ].length !== 0 && (
                    <ContentCard
                      key={section}
                      icon={getSectionIcon(section)}
                      contentToEdit={contentToEdit}
                      setContentToEdit={setContentToEdit}
                      inputData={inputData[section as keyof typeof inputData]}
                      resumeData={
                        resume.content[section as keyof typeof resume.content]
                      }
                    />
                  )
              )}
            {isEditOtherSection && (
              <Card>
                <InputsSection
                  itemId={contentToEdit.itemId}
                  inputData={
                    inputData[contentToEdit.section as keyof typeof inputData]
                  }
                  setContentToEdit={setContentToEdit}
                />
              </Card>
            )}
            <div className="centered">
              <Button onClick={() => setShowAddContent(true)} type="pink">
                + Add Content
              </Button>
            </div>
          </>
        )}
        {showAddContent && (
          <Modal setOpen={setShowAddContent} heading="Add Content">
            <AddContent
              setContentToEdit={setContentToEdit}
              setOpen={setShowAddContent}
            />
          </Modal>
        )}
      </CurrentSectionProvider>
    </AdditionalInfoProvider>
  );
};

export default Content;
