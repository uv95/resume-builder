import { useContentContext } from '@/context/ContentContext';
import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { Sections } from '@/utils/types/resumeTypes';
import {
    IDate,
    IEducationSettings,
    IFont, IJobTitle,
    IName,
    IProfessionalExperienceSettings,
    IProfileSettings,
    ISkillsLanguageSettings
} from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';

function useUpdateSettings() {
    const [updateSettings] = useMutation(UPDATE_SETTINGS);
    const { settings } = useContext(ResumeContext);
    const { content } =useContentContext();

    //sectionsOrder
    const addToSectionsOrder = (sectionName: Sections) => {
        const { left, right, top } = settings?.sectionsOrder!;
        const newSectionsOrderTop = top.includes(sectionName)
            ? top
            : [...top, sectionName];

        const newSectionsOrderRight =
      left.length > right.length && !top.includes(sectionName)
          ? [...right, sectionName]
          : right;
        const newSectionsOrderLeft =
      left.length <= right.length && !top.includes(sectionName)
          ? [...left, sectionName]
          : left;

        return updateSettings({
            variables: {
                id: settings?.id,
                sectionsOrder: {
                    top: newSectionsOrderTop,
                    left: newSectionsOrderLeft,
                    right: newSectionsOrderRight,
                },
            },
        });
    };

    const removeFromSectionsOrder = (sectionName: Sections) => {
        const contentSection = content![sectionName as keyof typeof content] as AdditionalContentSection;
        const sectionLength =
        contentSection.items.length;

        let newSectionsOrderTop = settings?.sectionsOrder.top! as Sections[];
        let newSectionsOrderLeft = settings?.sectionsOrder
            .left! as Sections[];
        let newSectionsOrderRight = settings?.sectionsOrder
            .right! as Sections[];

        if (sectionLength === 1) {
            newSectionsOrderTop = newSectionsOrderTop.filter(
                (section: Sections) => section !== sectionName
            );
            newSectionsOrderRight = newSectionsOrderRight.filter(
                (section: Sections) => section !== sectionName
            );
            newSectionsOrderLeft = newSectionsOrderLeft.filter(
                (section: Sections) => section !== sectionName
            );
        }

        return updateSettings({
            variables: {
                id: settings?.id,
                sectionsOrder: {
                    top: newSectionsOrderTop,
                    left: newSectionsOrderLeft,
                    right: newSectionsOrderRight,
                },
            },
        });
    };

    const updateSectionsOrderDragAndDrop = ({
        top,
        left,
        right,
    }: {
    top: Sections[];
    left: Sections[];
    right: Sections[];
  }) =>
        updateSettings({
            variables: {
                id: settings?.id,
                sectionsOrder: {
                    top,
                    left,
                    right,
                },
            },
        });

    const updateFont = (font: IFont) =>
        updateSettings({
            variables: {
                id: settings?.id,
                font,
            },
        });


    const updateName = (name: IName) =>
        updateSettings({
            variables: {
                id: settings?.id,
                name,
            },
        });

    const updateJobTitle = (jobTitle: IJobTitle) =>
        updateSettings({
            variables: {
                id: settings?.id,
                jobTitle,
            },
        });

    const updateDate = (date: IDate) =>
        updateSettings({
            variables: {
                id: settings?.id,
                date,
            },
        });

    const updateSkillsSettings = (skills: ISkillsLanguageSettings) =>
        updateSettings({
            variables: {
                id: settings?.id,
                skills,
            },
        });

    const updateLanguageSettings = (language: ISkillsLanguageSettings) =>
        updateSettings({
            variables: {
                id: settings?.id,
                language,
            },
        });

    const updateProfileSettings = (profile: IProfileSettings) =>
        updateSettings({
            variables: {
                id: settings?.id,
                profile,
            },
        });

    const updateEducationSettings = (education: IEducationSettings) =>
        updateSettings({
            variables: {
                id: settings?.id,
                education,
            },
        });

    const updateProfExperienceSettings = (
        professionalExperience: IProfessionalExperienceSettings
    ) =>
        updateSettings({
            variables: {
                id: settings?.id,
                professionalExperience,
            },
        });

    return {
        updateSectionsOrderDragAndDrop,
        addToSectionsOrder,
        removeFromSectionsOrder,
        updateFont,
        updateName,
        updateJobTitle,
        updateDate,
        updateSkillsSettings,
        updateLanguageSettings,
        updateProfileSettings,
        updateEducationSettings,
        updateProfExperienceSettings,
    };
}

export default useUpdateSettings;
