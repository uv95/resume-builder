import { AdditionalInfoProvider } from '@/context/AdditionalInfoContext';
import { CurrentSectionProvider } from '@/context/CurrentSectionContext';
import { ResumeContext } from '@/context/ResumeContext';
import { inputData } from '@/utils/consts/data';
import { Sections } from '@/utils/types/resumeTypes';
import React, { memo, useContext, useState } from 'react';
import AddContent from '../AddContent/AddContent';
import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import InputsSection from '../InputsSection/InputsSection';
import {Modal} from '../../UI/Modal/Modal';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import { getSectionIcon } from '@/utils/getSectionIcon';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import style from './Content.module.scss';
import { useTranslation } from 'next-i18next';
import { useContentContext } from '@/context/ContentContext';

const Content = () => {
    const {t} = useTranslation(['content'])

    const [showAddContent, setShowAddContent] = useState(false);
    const [contentToEdit, setContentToEdit] = useState<{
    section: Sections | '';
    itemId: string;
  }>({
      section: '',
      itemId: '',
  });
    const { settings } = useContext(ResumeContext);
    const { content } = useContentContext();
    const additionalContentSections = settings?.sectionsOrder.top.filter(section => section!=='personalDetails')! || []

    const showPersonalDetailsIfNotEditingAnything =
    !contentToEdit.section ||
    contentToEdit.section === Sections.PERSONAL_DETAILS;
    const isEditOtherSection =
    contentToEdit.section &&
    contentToEdit.section !== Sections.PERSONAL_DETAILS;

    return (
        <AdditionalInfoProvider>
            <CurrentSectionProvider>
                {(
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
                      (content![
                      section as keyof typeof content] as AdditionalContentSection).items
                          .length !== 0 && (
                          <ContentCard
                              key={section}
                              icon={getSectionIcon(section)}
                              setContentToEdit={setContentToEdit}
                              contentSection={content![section as keyof typeof content] as AdditionalContentSection}
                              sectionName={section as Sections}
                              items={
                                  (content![section as keyof typeof content] as AdditionalContentSection).items
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
                            <Button className={style.addContentBtn} onClick={() => setShowAddContent(true)} btnType="pink">
                                <span>+</span> {t('add-content')}
                            </Button>
                        </div>}
                    </>
                )}
                {showAddContent && (
                    <Modal close={() => setShowAddContent(false)} heading={t('add-content')}>
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

export default memo(Content);
