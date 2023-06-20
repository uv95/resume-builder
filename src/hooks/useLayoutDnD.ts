import { ResumeContext } from '@/context/ResumeContext';
import * as dnd from '@/utils/dragAndDropUtilityFunctions';
import { removeTypename } from '@/utils/removeTypename';
import { Position } from '@/utils/types/settingsTypes';
import { DragEvent, useContext, useState } from 'react';
import useUpdateSettings from './useUpdateSettings';

function useLayoutDnD() {
  const { resume } = useContext(ResumeContext);
  const { position } = resume?.settings.layout!;
  const { updateSectionsOrderDragAndDrop } = useUpdateSettings();

  const [sectionsOrder, setSectionsOrder] = useState(
    removeTypename(resume?.settings.sectionsOrder!)
  );

  const [isWithinDropArea, setIsWithinDropArea] = useState(false);
  const [initialColumn, setInitialColumn] = useState<Position | undefined>(
    undefined
  );
  const [previousColumn, setPreviousColumn] = useState<Position | undefined>(
    undefined
  );
  const [initialCard, setInitialCard] = useState('');

  const columns = {
    top: document.querySelector('#top') as HTMLDivElement,
    left: document.querySelector('#left') as HTMLDivElement,
    right: document.querySelector('#right') as HTMLDivElement,
  };

  const initialSectionsOrder =
    sectionsOrder[initialColumn as keyof typeof sectionsOrder];
  const initialColumnElement = columns[initialColumn as keyof typeof columns];

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsWithinDropArea(false);
    const target = e.target as HTMLDivElement;
    let currentColumn = target.parentElement?.id;
    if (
      Object.values(Position).some(
        (position) => position === target.parentElement?.id
      ) &&
      target.parentElement?.id !== currentColumn
    ) {
      currentColumn = target.parentElement?.id;
    }

    dnd.moveCardsIfDraggingOutside_Layout({
      target,
      sectionsOrder,
      initialCard,
      initialColumn,
      initialSectionsOrder,
    });

    if (
      initialColumnElement &&
      currentColumn &&
      initialCard &&
      target.id &&
      target.id !== Position.LEFT &&
      target.id !== Position.RIGHT
    ) {
      const hoveredCard = target.id;
      const currentColumnElement =
        columns[currentColumn as keyof typeof columns];
      const currentSectionsOrder =
        sectionsOrder[currentColumn as keyof typeof sectionsOrder];
      const hoveredCardIndex = (
        initialColumn === currentColumn
          ? initialSectionsOrder
          : currentSectionsOrder
      ).indexOf(hoveredCard);
      const initialCardIndex = initialSectionsOrder.indexOf(initialCard);
      const hoveredCardIs = (
        position: 'first' | 'next' | 'previous' | 'medium' | 'last'
      ) =>
        dnd.checkHoveredCardPosition({
          position,
          hoveredCardIndex,
          initialCardIndex,
          hoveredCard,
          currentSectionsOrder,
        });

      const addPaddingBottom = () =>
        dnd.increasePaddingBottom({
          sectionsOrder,
          initialColumn,
          currentColumn,
          leftColumn: columns.left,
          rightColumn: columns.right,
          position,
        });

      //____________________LOGIC_________________________//

      if (initialCard === hoveredCard)
        dnd.placeBackAllCardsFrom(initialColumnElement);

      ///if in same column
      if (initialColumn === currentColumn) {
        if (previousColumn !== currentColumn) {
          dnd.placeBackAllCardsFrom(
            columns[previousColumn as keyof typeof columns]
          );
          columns.left.style.paddingBottom = '0';
          columns.right.style.paddingBottom = '0';
        }
        if (
          dnd.allCardsAreUp(initialColumnElement) ||
          (dnd.someCardsAreUp(initialColumnElement) &&
            previousColumn !== currentColumn)
        )
          dnd.placeBackAllCardsFrom(initialColumnElement);

        if (hoveredCardIs('next') && previousColumn === currentColumn)
          dnd.isUp(target) ? dnd.placeBack(target) : dnd.moveUp(target, 125);

        if (hoveredCardIs('previous'))
          dnd.isDown(target)
            ? dnd.placeBack(target)
            : dnd.moveDown(target, 125);
      }

      ///if in another column
      if (initialColumn !== currentColumn) {
        //initial column
        if (initialCardIndex === 0) {
          dnd.placeBackAllCardsFrom(initialColumnElement);
          dnd.moveAllCardsUp({ column: initialColumnElement, percent: 125 });
        }
        if (initialCardIndex !== 0)
          dnd.placeBackAllCardsFrom(initialColumnElement);

        if (
          initialCardIndex !== 0 &&
          initialCardIndex !== initialSectionsOrder.length - 1
        )
          dnd.moveAllCardsUp({
            column: initialColumnElement,
            sliceFromIndex: initialCardIndex + 1,
            percent: 125,
          });

        //current column
        if (hoveredCardIs('first')) {
          dnd.allCardsAreDown(currentColumnElement)
            ? dnd.placeBack(target)
            : dnd.moveAllCardsDown({
                column: currentColumnElement,
                percent: 125,
              });

          addPaddingBottom();
        }
        if (hoveredCardIs('medium')) {
          if (dnd.isDown(target)) dnd.placeBack(target);
          else {
            dnd.moveAllCardsDown({
              column: currentColumnElement,
              sliceFromIndex: hoveredCardIndex,
              percent: 125,
            });
            addPaddingBottom();
          }
        }

        if (hoveredCardIs('last')) {
          if (dnd.isDown(target) && !hoveredCardIs('first'))
            dnd.placeBack(target);
          else {
            dnd.moveDown(target, 125);
            addPaddingBottom();
          }
        }
      }
    }
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLDivElement;
    if (!target.id) dnd.placeBackAllCardsFrom(initialColumnElement);

    setIsWithinDropArea(true);

    if (Object.values(Position).some((position) => position === target.id)) {
      const newInitialSectionsOrder = sectionsOrder[
        initialColumn as keyof typeof sectionsOrder
      ].filter((el: string) => el !== initialCard);

      const arrayOfCardPositions = Array.from(target.children)
        .filter((el) => el.id && el.id !== initialCard)
        .map((el) => (el as HTMLDivElement).dataset.position);

      const indexToPutCard = dnd.getIndexToPutCard(
        arrayOfCardPositions as string[]
      );

      if (initialColumn !== target.id) {
        const currentSectionsOrder = [...sectionsOrder[target.id]];
        currentSectionsOrder.splice(indexToPutCard, 0, initialCard);
        dnd.removeTransitionFromAllCardsFrom(initialColumnElement);
        dnd.removeTransitionFromAllCardsFrom(target);
        columns.left.style.transition = 'none';
        columns.right.style.transition = 'none';

        const newSectionsOrder = {
          ...removeTypename(sectionsOrder),
          [target.id]: currentSectionsOrder,
          [target.id === Position.LEFT ? Position.RIGHT : Position.LEFT]:
            newInitialSectionsOrder,
        };

        setSectionsOrder(newSectionsOrder);
        updateSectionsOrderDragAndDrop(newSectionsOrder);
      } else {
        newInitialSectionsOrder.splice(indexToPutCard, 0, initialCard);
        dnd.removeTransitionFromAllCardsFrom(initialColumnElement);

        const newSectionsOrder = {
          ...removeTypename(sectionsOrder),
          [initialColumn]: newInitialSectionsOrder,
        };
        setSectionsOrder(newSectionsOrder);
        updateSectionsOrderDragAndDrop(newSectionsOrder);
      }
      dnd.placeBackAllCardsFrom(target);
      dnd.placeBackAllCardsFrom(initialColumnElement);

      if (columns.left) {
        columns.left.style.paddingBottom = '0';
        columns.right.style.paddingBottom = '0';
      }
    }
    dnd.returnOpacityTo(initialCard);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!isWithinDropArea) {
      dnd.placeBackAllCardsFrom(initialColumnElement);
      dnd.returnOpacityTo(initialCard);
    }
    dnd.addTransitionToAllCardsFrom(initialColumnElement);
  };

  return {
    dragEndHandler,
    dragEnterHandler,
    dragOverHandler,
    dropHandler,
    setInitialColumn,
    setPreviousColumn,
    previousColumn,
    setInitialCard,
    initialCard,
    sectionsOrder,
  };
}

export default useLayoutDnD;
