import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settingsMutations';
import { removeTypename } from '@/utils/removeTypename';
import { IEducation } from '@/utils/types';
import { useMutation } from '@apollo/client';
import { useCallback, useContext } from 'react';

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
          columnWidth: removeTypename(resume?.settings.layout.columnWidth!),
          position,
          columns,
        },
      },
    });
  };

  //columns
  const updateColumns = (columns: number) => {
    const { position, columnWidth } = resume?.settings.layout!;
    return updateSettings({
      variables: {
        id: resume?.settings.id,
        layout: { position, columnWidth: removeTypename(columnWidth), columns },
      },
    });
  };

  return {
    updateColumns,
    updatePosition,
    addToSectionsOrder,
    removeFromSectionsOrder,
  };
}

export default useUpdateSettings;
