import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import {
  addTransitionToAllCardsFrom,
  allCardsAreDown,
  allCardsAreUp,
  checkHoveredCardPosition,
  getIndexToPutCard,
  increasePaddingBottom,
  isDown,
  isUp,
  moveAllCardsDown,
  moveAllCardsUp,
  moveCardsIfDraggingOutside,
  moveDown,
  moveUp,
  placeBack,
  placeBackAllCardsFrom,
  removeTransitionFromAllCardsFrom,
  returnOpacityTo,
  someCardsAreUp,
} from '@/utils/dragAndDropUtilityFunctions';
import { removeTypename } from '@/utils/removeTypename';
import React, { DragEvent, useContext, useState } from 'react';
import SettingsCard from '../UI/SettingsCard';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import Position from './Position';
import RearrangeSections from './RearrangeSections';

const Layout = () => {
  const { resume } = useContext(ResumeContext);
  const { position } = resume?.settings.layout!;
  const { updateSectionsOrderDragAndDrop } = useUpdateSettings();

  const [sectionsOrder, setSectionsOrder] = useState(
    removeTypename(resume?.settings.sectionsOrder!)
  );

  const [initialColumn, setInitialColumn] = useState<
    'left' | 'right' | 'top' | undefined
  >(undefined);
  const [previousColumn, setPreviousColumn] = useState<
    'left' | 'right' | 'top' | undefined
  >(undefined);
  const [initialCard, setInitialCard] = useState('');
  const [isWithinDropArea, setIsWithinDropArea] = useState(false);

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
      (target.parentElement?.id === 'left' || 'right' || 'top') &&
      target.parentElement?.id !== currentColumn
    ) {
      currentColumn = target.parentElement?.id;
    }

    moveCardsIfDraggingOutside({
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
      target.id !== 'left' &&
      target.id !== 'right'
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
        checkHoveredCardPosition({
          position,
          hoveredCardIndex,
          initialCardIndex,
          hoveredCard,
          currentSectionsOrder,
        });

      const addPaddingBottom = () =>
        increasePaddingBottom({
          sectionsOrder,
          initialColumn,
          currentColumn,
          leftColumn: columns.left,
          rightColumn: columns.right,
          position,
        });

      //____________________LOGIC_________________________//

      if (initialCard === hoveredCard)
        placeBackAllCardsFrom(initialColumnElement);

      ///if in same column
      if (initialColumn === currentColumn) {
        if (previousColumn !== currentColumn) {
          placeBackAllCardsFrom(
            columns[previousColumn as keyof typeof columns]
          );
          columns.left.style.paddingBottom = '0';
          columns.right.style.paddingBottom = '0';
        }
        if (
          allCardsAreUp(initialColumnElement) ||
          (someCardsAreUp(initialColumnElement) &&
            previousColumn !== currentColumn)
        )
          placeBackAllCardsFrom(initialColumnElement);

        if (hoveredCardIs('next') && previousColumn === currentColumn)
          isUp(target) ? placeBack(target) : moveUp(target);

        if (hoveredCardIs('previous'))
          isDown(target) ? placeBack(target) : moveDown(target);
      }

      ///if in another column
      if (initialColumn !== currentColumn) {
        //initial column
        if (initialCardIndex === 0) {
          placeBackAllCardsFrom(initialColumnElement);
          moveAllCardsUp({ column: initialColumnElement });
        }
        if (initialCardIndex !== 0) placeBackAllCardsFrom(initialColumnElement);

        if (
          initialCardIndex !== 0 &&
          initialCardIndex !== initialSectionsOrder.length - 1
        )
          moveAllCardsUp({
            column: initialColumnElement,
            sliceFromIndex: initialCardIndex + 1,
          });

        //current column
        if (hoveredCardIs('first')) {
          allCardsAreDown(currentColumnElement)
            ? placeBack(target)
            : moveAllCardsDown({ column: currentColumnElement });

          addPaddingBottom();
        }
        if (hoveredCardIs('medium')) {
          if (isDown(target)) placeBack(target);
          else {
            moveAllCardsDown({
              column: currentColumnElement,
              sliceFromIndex: hoveredCardIndex,
            });
            addPaddingBottom();
          }
        }

        if (hoveredCardIs('last')) {
          if (isDown(target) && !hoveredCardIs('first')) placeBack(target);
          else {
            moveDown(target);
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
    if (!target.id) placeBackAllCardsFrom(initialColumnElement);

    setIsWithinDropArea(true);

    if (target.id === 'left' || target.id === 'right' || target.id === 'top') {
      const newInitialSectionsOrder = sectionsOrder[
        initialColumn as keyof typeof sectionsOrder
      ].filter((el: string) => el !== initialCard);

      const arrayOfCardPositions = Array.from(target.children)
        .filter((el) => el.id && el.id !== initialCard)
        .map((el) => (el as HTMLDivElement).dataset.position);

      const indexToPutCard = getIndexToPutCard(
        arrayOfCardPositions as string[]
      );

      if (initialColumn !== target.id) {
        const currentSectionsOrder = [...sectionsOrder[target.id]];
        currentSectionsOrder.splice(indexToPutCard, 0, initialCard);
        removeTransitionFromAllCardsFrom(initialColumnElement);
        removeTransitionFromAllCardsFrom(target);
        columns.left.style.transition = 'none';
        columns.right.style.transition = 'none';

        const newSectionsOrder = {
          ...removeTypename(sectionsOrder),
          [target.id]: currentSectionsOrder,
          [target.id === 'left' ? 'right' : 'left']: newInitialSectionsOrder,
        };

        setSectionsOrder(newSectionsOrder);
        updateSectionsOrderDragAndDrop(newSectionsOrder);
      } else {
        newInitialSectionsOrder.splice(indexToPutCard, 0, initialCard);
        removeTransitionFromAllCardsFrom(initialColumnElement);

        const newSectionsOrder = {
          ...removeTypename(sectionsOrder),
          [initialColumn]: newInitialSectionsOrder,
        };
        setSectionsOrder(newSectionsOrder);
        updateSectionsOrderDragAndDrop(newSectionsOrder);
      }
      placeBackAllCardsFrom(target);
      placeBackAllCardsFrom(initialColumnElement);

      if (columns.left) {
        columns.left.style.paddingBottom = '0';
        columns.right.style.paddingBottom = '0';
      }
    }
    returnOpacityTo(initialCard);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!isWithinDropArea) {
      placeBackAllCardsFrom(initialColumnElement);
      returnOpacityTo(initialCard);
    }
    addTransitionToAllCardsFrom(initialColumnElement);
  };

  return (
    <div
      onDragEnter={(e) => dragEnterHandler(e)}
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
    >
      <SettingsCard title="Layout">
        <Position />
        <Columns />
        <RearrangeSections
          setInitialColumn={setInitialColumn}
          setPreviousColumn={setPreviousColumn}
          previousColumn={previousColumn}
          setInitialCard={setInitialCard}
          initialCard={initialCard}
          sectionsOrder={sectionsOrder}
        />

        {resume?.settings.layout.columns === 2 && <ColumnWidth />}
      </SettingsCard>
    </div>
  );
};

export default Layout;
