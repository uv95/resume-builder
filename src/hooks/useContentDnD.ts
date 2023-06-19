import { ResumeContext } from '@/context/ResumeContext';
import * as dnd from '@/utils/dragAndDropUtilityFunctions';
import { formatLevelProp } from '@/utils/formatLevelProp';
import { removeTypename } from '@/utils/removeTypename';
import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from '@/utils/types';
import { DragEvent, useContext, useEffect, useState } from 'react';
import useUpdateMutations from './useUpdateMutations';

function useContentDnD(
  section: string,
  list:
    | IEducation[]
    | ISkills[]
    | IProfile[]
    | IProject[]
    | ILanguage[]
    | IProfessionalExperience[]
) {
  const { resume } = useContext(ResumeContext);
  const updateContent = useUpdateMutations({
    section,
    updateAll: true,
    resumeId: resume?.id!,
  });

  const [itemsOrder, setItemsOrder] = useState(list);

  const [isWithinDropArea, setIsWithinDropArea] = useState(false);
  const [initialCard, setInitialCard] = useState('');

  const listElement = document.querySelector(
    '#' + section + '-list'
  ) as HTMLDivElement;

  useEffect(() => {
    setItemsOrder(list);
  }, [list]);

  const dragEnterHandler = (e: DragEvent<HTMLUListElement>) => {
    e.preventDefault();

    setIsWithinDropArea(false);
    const target = e.target as HTMLDivElement;

    if (itemsOrder && listElement && initialCard && target.dataset.position) {
      const hoveredCard = target.id;
      const hoveredCardIndex = itemsOrder
        .map((item: any) => item.id)
        .indexOf(hoveredCard);
      const initialCardIndex = itemsOrder
        .map((item: any) => item.id)
        .indexOf(initialCard);

      const hoveredCardIs = (position: 'next' | 'previous') => {
        if (position === 'next') return hoveredCardIndex > initialCardIndex;
        if (position === 'previous') return hoveredCardIndex < initialCardIndex;
      };

      //____________________LOGIC_________________________//

      if (initialCard === hoveredCard) dnd.placeBackAllCardsFrom(listElement);

      if (hoveredCardIs('next')) {
        dnd.isUp(target) ? dnd.placeBack(target) : dnd.moveUp(target, 100);
      }

      if (hoveredCardIs('previous')) {
        dnd.isDown(target) ? dnd.placeBack(target) : dnd.moveDown(target, 100);
      }
    }
  };

  const dropHandler = (e: DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLDivElement;
    if (!target.id || initialCard === target.id)
      return dnd.placeBackAllCardsFrom(listElement);

    setIsWithinDropArea(true);

    //@ts-ignore
    const newItemsIdOrder = itemsOrder.filter(
      (item: any) => item.id !== initialCard
    );

    const arrayOfCardPositions = Array.from(listElement.children)
      .filter((el) => el.id && el.id !== initialCard)
      .map((el) => (el as HTMLDivElement).dataset.position);

    const indexToPutCard = dnd.getIndexToPutCard(
      arrayOfCardPositions as string[]
    );

    newItemsIdOrder.splice(
      indexToPutCard,
      0,
      //@ts-ignore
      itemsOrder.find((item: any) => item.id === initialCard) as
        | IEducation
        | ILanguage
        | IProfessionalExperience
        | IProfile
        | IProject
        | ISkills
    );
    const newItemsOrder = newItemsIdOrder.map((item: any, index: number) => {
      const modifiedItem = removeTypename(item);
      if (section === 'language')
        modifiedItem.languageLevel = formatLevelProp({
          section: 'language',
          item: modifiedItem,
        });
      if (section === 'skills')
        modifiedItem.skillLevel = formatLevelProp({
          section: 'skills',
          item: modifiedItem,
        });
      modifiedItem.index = index;
      return modifiedItem;
    });

    dnd.removeTransitionFromAllCardsFrom(listElement);
    setItemsOrder(newItemsOrder);
    updateContent({ items: newItemsOrder });

    dnd.placeBackAllCardsFrom(listElement);
    dnd.returnOpacityTo(initialCard);
  };

  const dragEndHandler = (e: DragEvent<HTMLUListElement>) => {
    if (!isWithinDropArea) {
      dnd.placeBackAllCardsFrom(listElement);
      dnd.returnOpacityTo(initialCard);
    }
    dnd.addTransitionToAllCardsFrom(listElement);
  };

  return {
    dragEnterHandler,
    dragEndHandler,
    dropHandler,
    setInitialCard,
    initialCard,
    itemsOrder,
  };
}

export default useContentDnD;
