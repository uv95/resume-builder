import { AdditionalInfoProvider } from '@/context/AdditionalInfoContext';
import { CurrentSectionProvider } from '@/context/CurrentSectionContext';
import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext, useEffect, useState } from 'react';
import AddContent from '../AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import InputsSection from '../InputsSection/InputsSection';
import Modal from '../Modal/Modal';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import ResumeName from '../ResumeName/ResumeName';
import style from './MainPanel.module.scss';

const MainPanel = () => {
  const [showAddContent, setShowAddContent] = useState(false);
  const [contentToEdit, setContentToEdit] = useState({
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

  return (
    <AdditionalInfoProvider>
      <CurrentSectionProvider>
        {resume && (
          <div className={style.mainPanel}>
            <div className="flex-column">
              <ResumeName resumeName={resume.name} id={resume.id} />
              {(!contentToEdit.section ||
                contentToEdit.section === 'personalDetails') && (
                <PersonalDetails
                  contentToEdit={contentToEdit}
                  setContentToEdit={setContentToEdit}
                />
              )}
              {!contentToEdit.section &&
                contentToEdit.section !== 'personalDetails' &&
                resume.settings.sectionsOrder.map(
                  (section) =>
                    resumeArraySections[
                      section as keyof typeof resumeArraySections
                    ].length !== 0 && (
                      <ContentCard
                        key={section}
                        contentToEdit={contentToEdit}
                        setContentToEdit={setContentToEdit}
                        inputData={inputData[section as keyof typeof inputData]}
                        resumeData={
                          resume.content[section as keyof typeof resume.content]
                        }
                      />
                    )
                )}
              {contentToEdit.section &&
                contentToEdit.section !== 'personalDetails' && (
                  <Card>
                    <InputsSection
                      itemId={contentToEdit.itemId}
                      inputData={
                        inputData[
                          contentToEdit.section as keyof typeof inputData
                        ]
                      }
                      setContentToEdit={setContentToEdit}
                    />
                  </Card>
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

export default MainPanel;
