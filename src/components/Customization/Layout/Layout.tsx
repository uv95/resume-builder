import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import {
  checkHoveredCardPosition,
  getIndexToPutCard,
  increasePaddingBottom,
  isDown,
  isUp,
  moveCardsIfDraggingOutside,
  moveDown,
  moveUp,
  placeBack,
  placeBackAllCardsFrom,
  removeTransitionFromAllCardsFrom,
  returnOpacityTo,
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
          Array.from(initialColumnElement.children).every((el) =>
            isUp(el as HTMLDivElement)
          ) ||
          (Array.from(initialColumnElement.children).some((el) =>
            isUp(el as HTMLDivElement)
          ) &&
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
        const addPaddingBottom = () =>
          increasePaddingBottom({
            sectionsOrder,
            initialColumn,
            currentColumn,
            leftColumn: columns.left,
            rightColumn: columns.right,
            position,
          });
        //initial column
        if (initialCardIndex === 0) {
          placeBackAllCardsFrom(initialColumnElement);

          Array.from(initialColumnElement.children)
            .filter((el) => el.id)
            .forEach((el) => moveUp(el as HTMLDivElement));
        }
        if (initialCardIndex !== 0) placeBackAllCardsFrom(initialColumnElement);

        if (
          initialCardIndex !== 0 &&
          initialCardIndex !== initialSectionsOrder.length - 1
        ) {
          Array.from(initialColumnElement.children)
            .filter((el) => el.id)
            .slice(initialCardIndex + 1)
            .forEach((el) => moveUp(el as HTMLDivElement));
        }

        //current column
        if (hoveredCardIs('first')) {
          Array.from(currentColumnElement.children)
            .filter((el) => el.id)
            .every((el) => isDown(el as HTMLDivElement))
            ? placeBack(target)
            : Array.from(currentColumnElement.children)
                .filter((el) => el.id)
                .forEach((el) => moveDown(el as HTMLDivElement));

          addPaddingBottom();
        }
        if (hoveredCardIs('medium')) {
          if (isDown(target)) placeBack(target);
          else {
            Array.from(currentColumnElement.children)
              .filter((el) => el.id)
              .slice(hoveredCardIndex)
              .forEach((el) => moveDown(el as HTMLDivElement));

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
    if (!target.id) {
      placeBackAllCardsFrom(initialColumnElement);
      (
        document.querySelector('#' + initialCard) as HTMLDivElement
      ).style.opacity = '1';
    }
    if (target.id === initialCard) returnOpacityTo(initialCard);

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
      returnOpacityTo(initialCard);
    }
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    if (!isWithinDropArea) {
      placeBackAllCardsFrom(initialColumnElement);
      returnOpacityTo(initialCard);
    }
    Array.from(initialColumnElement.children).forEach(
      (el) => ((el as HTMLDivElement).style.transition = 'all 0.2s')
    );
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
//309
