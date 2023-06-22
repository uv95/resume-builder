import { AdditionalInfoProvider } from '@/context/AdditionalInfoContext';
import { CurrentSectionProvider } from '@/context/CurrentSectionContext';
import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/data';
import { Sections } from '@/utils/types/resumeTypes';
import React, { useContext, useState } from 'react';
import AddContent from './AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from './ContentCard/ContentCard';
import InputsSection from './InputsSection/InputsSection';
import Modal from '../Modal/Modal';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import { getSectionIcon } from '@/utils/getSectionIcon';
import { AdditionalContentSection } from '@/utils/types/contentTypes';

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
    const additionalContentSections = resume?.settings.sectionsOrder.top.filter(section=>section!=='personalDetails')!

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
              additionalContentSections.map(
                  (section) =>
                      ( resume.content[
                      section as keyof typeof resume.content] as AdditionalContentSection).items
                          .length !== 0 && (
                          <ContentCard
                              key={section}
                              icon={getSectionIcon(section)}
                              contentToEdit={contentToEdit}
                              setContentToEdit={setContentToEdit}
                              inputData={inputData[section as keyof typeof inputData]}
                              items={
                                  (resume.content[section as keyof typeof resume.content] as AdditionalContentSection).items
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
                        {!contentToEdit.section && <div className="centered">
                            <Button  onClick={() => setShowAddContent(true)} btnType="pink">
                                + Add Content
                            </Button>
                        </div>}
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
