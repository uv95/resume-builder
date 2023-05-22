import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { removeTypename } from '@/utils/removeTypename';
import { IAdvancedMulticolor, IBasicMulticolor, IFont } from '@/utils/types';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';

function useUpdateSettings() {
  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  const { resume } = useContext(ResumeContext);

  //sectionsOrder
  const addToSectionsOrder = (sectionName: string) => {
    const sectionsOrderTop = resume?.settings.sectionsOrder.top!;
    const newSectionsOrderTop = sectionsOrderTop.includes(sectionName)
      ? sectionsOrderTop
      : [...sectionsOrderTop, sectionName];

    const { left, right } = resume?.settings.sectionsOrder!;

    const newSectionsOrderRight =
      left.length > right.length && !right.includes(sectionName)
        ? [...right, sectionName]
        : right;
    const newSectionsOrderLeft =
      left.length > right.length && !left.includes(sectionName)
        ? left
        : [...left, sectionName];

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

  const removeFromSectionsOrder = (sectionName: string) => {
    const content = resume?.content!;
    const sectionLength = content[sectionName as keyof typeof content]!.length;

    let newSectionsOrderTop = resume?.settings.sectionsOrder.top!;
    let newSectionsOrderLeft = resume?.settings.sectionsOrder.left!;
    let newSectionsOrderRight = resume?.settings.sectionsOrder.right!;

    if (sectionLength === 1) {
      newSectionsOrderTop = newSectionsOrderTop.filter(
        (section: string) => section !== sectionName
      );
      newSectionsOrderRight = newSectionsOrderRight.filter(
        (section: string) => section !== sectionName
      );
      newSectionsOrderLeft = newSectionsOrderLeft.filter(
        (section: string) => section !== sectionName
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

  //position
  const updatePosition = (position: string, columns: number) => {
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
  const updateColumns = (columns: number) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        layout: { ...removeTypename(resume?.settings.layout!), columns },
      },
    });
  };

  //Colors
  //mode
  const updateMode = (mode: 'basic' | 'advanced') => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        colors: { ...removeTypename(resume?.settings.colors!), mode },
      },
    });
  };

  //option: basic/advanced
  const selectOption = (
    option: 'accent' | 'multicolor',
    mode: 'basic' | 'advanced'
  ) => {
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
  const updateAccentColor = (accent: string, mode: 'basic' | 'advanced') => {
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
    mode: 'basic' | 'advanced'
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

  // update spacing
  const updateSpacing = (
    section:
      | 'fontSize'
      | 'lineHeight'
      | 'leftRightMargin'
      | 'topBottomMargin'
      | 'spaceBetweenSections',
    value: number
  ) => {
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

  // update font
  const updateFont = (font: IFont) => {
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        font,
      },
    });
  };

  return {
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
  };
}

export default useUpdateSettings;
