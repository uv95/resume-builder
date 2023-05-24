import { AdditionalInfoProvider } from '@/context/AdditionalInfoContext';
import { CurrentSectionProvider } from '@/context/CurrentSectionContext';
import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/data';
import { IResumeArraySections } from '@/utils/types';
import React, { useContext, useEffect, useState } from 'react';
import AddContent from './AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from './ContentCard/ContentCard';
import InputsSection from './InputsSection/InputsSection';
import Modal from '../Modal/Modal';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import skills from '../../icons/skills.svg';
import work from '../../icons/work.svg';
import education from '../../icons/education.svg';
import project from '../../icons/project.svg';
import profile from '../../icons/profile.svg';
import language from '../../icons/world.svg';

const Content = () => {
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

  const getIcon = (section: string) => {
    if (section === 'language') return language;
    if (section === 'skills') return skills;
    if (section === 'professionalExperience') return work;
    if (section === 'education') return education;
    if (section === 'project') return project;
    if (section === 'profile') return profile;
  };

  return (
    <AdditionalInfoProvider>
      <CurrentSectionProvider>
        {resume && (
          <>
            {(!contentToEdit.section ||
              contentToEdit.section === 'personalDetails') && (
              <PersonalDetails
                contentToEdit={contentToEdit}
                setContentToEdit={setContentToEdit}
              />
            )}
            {!contentToEdit.section &&
              contentToEdit.section !== 'personalDetails' &&
              resume.settings.sectionsOrder.top.map(
                (section) =>
                  resumeArraySections[
                    section as keyof typeof resumeArraySections
                  ].length !== 0 && (
                    <ContentCard
                      key={section}
                      icon={getIcon(section)}
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
