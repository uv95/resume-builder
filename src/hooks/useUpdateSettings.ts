import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { removeTypename } from '@/utils/removeTypename';
import { Sections } from '@/utils/types/resumeTypes';
import {
  ColorOption,
  IAdvancedMulticolor,
  IBasicMulticolor,
  IDate,
  IEducationSettings,
  IFont,
  IHeader,
  IHeading,
  IJobTitle,
  IName,
  IProfessionalExperienceSettings,
  IProfileSettings,
  ISkillsLanguageSettings,
  ISubtitle,
  Mode,
  Position,
  SpacingSections,
} from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';

function useUpdateSettings() {
  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  const { resume } = useContext(ResumeContext);

  //sectionsOrder
  const addToSectionsOrder = (sectionName: Sections) => {
    const { left, right, top } = resume?.settings.sectionsOrder!;
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
        id: resume?.settings.id,
        sectionsOrder: {
          top: newSectionsOrderTop,
          left: newSectionsOrderLeft,
          right: newSectionsOrderRight,
        },
      },
    });
  };

  const removeFromSectionsOrder = (sectionName: Sections) => {
    const content = resume?.content!;
    const sectionLength =
      //@ts-ignore
      content[sectionName as keyof typeof content]!.length;

    let newSectionsOrderTop = resume?.settings.sectionsOrder.top! as Sections[];
    let newSectionsOrderLeft = resume?.settings.sectionsOrder
      .left! as Sections[];
    let newSectionsOrderRight = resume?.settings.sectionsOrder
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
        id: resume?.settings.id,
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
        id: resume?.settings.id,
        sectionsOrder: {
          top,
          left,
          right,
        },
      },
    });

  //position
  const updatePosition = (position: Position, columns: number) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        layout: {
          ...removeTypename(resume?.settings.layout!),
          position,
          columns,
        },
      },
    });
  };

  //columns
  const updateColumns = (columns: 1 | 2) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        layout: { ...removeTypename(resume?.settings.layout!), columns },
      },
    });
  };

  //Colors
  //mode
  const updateMode = (mode: Mode) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        colors: { ...removeTypename(resume?.settings.colors!), mode },
      },
    });
  };

  //option: basic/advanced
  const selectOption = (option: ColorOption, mode: Mode) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        colors: {
          ...removeTypename(resume?.settings.colors!),
          [mode]: {
            ...removeTypename(resume?.settings.colors[mode]!),
            selected: option,
          },
        },
      },
    });
  };

  //update accent color
  const updateAccentColor = (accent: string, mode: Mode) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        colors: {
          ...removeTypename(resume?.settings.colors!),
          [mode]: { ...removeTypename(resume?.settings.colors[mode]!), accent },
        },
      },
    });
  };

  //update multicolor
  const updateMulticolor = (
    multicolor: IAdvancedMulticolor | IBasicMulticolor,
    mode: Mode
  ) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        colors: {
          ...removeTypename(resume?.settings.colors!),
          [mode]: {
            ...removeTypename(resume?.settings.colors[mode]!),
            multicolor,
          },
        },
      },
    });
  };

  const updateSpacing = (section: SpacingSections, value: number) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        spacing: {
          ...removeTypename(resume?.settings.spacing!),
          [section]: value,
        },
      },
    });
  };

  const updateFont = (font: IFont) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        font,
      },
    });

  const updateHeading = (heading: IHeading) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        heading,
      },
    });

  const updateSubtitle = (subtitle: ISubtitle) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        subtitle,
      },
    });

  const updateHeader = (header: IHeader) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        header,
      },
    });

  const updateName = (name: IName) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        name,
      },
    });

  const updateJobTitle = (jobTitle: IJobTitle) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        jobTitle,
      },
    });

  const updateDate = (date: IDate) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        date,
      },
    });

  const updateSkillsSettings = (skills: ISkillsLanguageSettings) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        skills,
      },
    });

  const updateLanguageSettings = (language: ISkillsLanguageSettings) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        language,
      },
    });

  const updateProfileSettings = (profile: IProfileSettings) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        profile,
      },
    });

  const updateEducationSettings = (education: IEducationSettings) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        education,
      },
    });

  const updateProfExperienceSettings = (
    professionalExperience: IProfessionalExperienceSettings
  ) =>
    updateSettings({
      variables: {
        id: resume?.settings.id,
        professionalExperience,
      },
    });

  return {
    updateSectionsOrderDragAndDrop,
    updateColumns,
    updatePosition,
    addToSectionsOrder,
    removeFromSectionsOrder,
    updateMode,
    selectOption,
    updateAccentColor,
    updateMulticolor,
    updateSpacing,
    updateFont,
    updateHeading,
    updateSubtitle,
    updateHeader,
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
