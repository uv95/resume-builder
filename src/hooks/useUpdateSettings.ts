import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { removeTypename } from '@/utils/removeTypename';
import { IAdvancedMulticolor, IBasicMulticolor } from '@/utils/types';
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

    const left = resume?.settings.sectionsOrder.left!;
    const right = resume?.settings.sectionsOrder.right!;

    const newSectionsOrderRight =
      left.length > right.length ? [...right, sectionName] : right;
    const newSectionsOrderLeft =
      left.length > right.length ? left : [...left, sectionName];

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

  //update applyAccentColor
  // const updateApplyAccentColor = (applyAccentColor: IApplyAccentColor) => {
  //   return updateSettings({
  //     variables: {
  //       id: resume?.settings.id,
  //       colors: {
  //         ...removeTypename(resume?.settings.colors!),
  //         applyAccentColor: removeTypename(applyAccentColor),
  //       },
  //     },
  //     // update(cache, { data }) {
  //     //   const newData = data.updateSettings;
  //     //   const { resume: cachedResume } = cache.readQuery({
  //     //     query: GET_RESUME,
  //     //     variables: { id: resume?.id },
  //     //   })!;
  //     //   console.log(newData, 'newData');
  //     //   cache.writeQuery({
  //     //     query: GET_RESUME,
  //     //     data: {
  //     //       resume: {
  //     //         ...cachedResume,
  //     //         settings: newData,
  //     //       },
  //     //     },
  //     //   });
  //     // },
  //   });
  // };

  return {
    updateColumns,
    updatePosition,
    addToSectionsOrder,
    removeFromSectionsOrder,
    updateMode,
    selectOption,
    updateAccentColor,
    updateMulticolor,
  };
}

export default useUpdateSettings;
