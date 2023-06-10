export const moveUp = (element: HTMLDivElement) => {
  element.style.transform = 'translateY(-125%)';
  element.dataset.position = 'movedUp';
};
export const moveDown = (element: HTMLDivElement) => {
  element.style.transform = 'translateY(125%)';
  element.dataset.position = 'movedDown';
};
export const isUp = (element: HTMLDivElement) =>
  element.dataset.position === 'movedUp';

export const isDown = (element: HTMLDivElement) =>
  element.dataset.position === 'movedDown';

export const placeBack = (element: HTMLDivElement) => {
  element.style.transform = 'none';
  element.dataset.position = 'default';
};

export const placeBackAllCardsFrom = (column: HTMLDivElement) =>
  Array.from(column.children)
    .filter((el) => el.id)
    .forEach((el) => placeBack(el as HTMLDivElement));

export const moveAllCardsDown = ({
  column,
  sliceFromIndex = 0,
}: {
  column: HTMLDivElement;
  sliceFromIndex?: number;
}) =>
  Array.from(column.children)
    .filter((el) => el.id)
    .slice(sliceFromIndex)
    .forEach((el) => moveDown(el as HTMLDivElement));

export const moveAllCardsUp = ({
  column,
  sliceFromIndex = 0,
}: {
  column: HTMLDivElement;
  sliceFromIndex?: number;
}) =>
  Array.from(column.children)
    .filter((el) => el.id)
    .slice(sliceFromIndex)
    .forEach((el) => moveUp(el as HTMLDivElement));

export const allCardsAreDown = (column: HTMLDivElement) =>
  Array.from(column.children)
    .filter((el) => el.id)
    .every((el) => isDown(el as HTMLDivElement));

export const allCardsAreUp = (column: HTMLDivElement) =>
  Array.from(column.children)
    .filter((el) => el.id)
    .every((el) => isUp(el as HTMLDivElement));

export const someCardsAreUp = (column: HTMLDivElement) =>
  Array.from(column.children).some((el) => isUp(el as HTMLDivElement));

export const removeTransitionFromAllCardsFrom = (column: HTMLDivElement) =>
  Array.from(column.children).forEach(
    (el) => ((el as HTMLDivElement).style.transition = 'none')
  );
export const addTransitionToAllCardsFrom = (column: HTMLDivElement) =>
  Array.from(column.children).forEach(
    (el) => ((el as HTMLDivElement).style.transition = 'all 0.2s')
  );

export const returnOpacityTo = (card: string) =>
  ((document.querySelector('#' + card) as HTMLDivElement).style.opacity = '1');

export const checkHoveredCardPosition = ({
  position,
  hoveredCardIndex,
  initialCardIndex,
  hoveredCard,
  currentSectionsOrder,
}: {
  position: 'first' | 'next' | 'previous' | 'medium' | 'last';
  hoveredCardIndex: number;
  initialCardIndex: number;
  hoveredCard: string;
  currentSectionsOrder: string[];
}) => {
  if (position === 'next') return hoveredCardIndex > initialCardIndex;
  if (position === 'previous') return hoveredCardIndex < initialCardIndex;
  if (position === 'first') return hoveredCard === currentSectionsOrder[0];
  if (position === 'medium')
    return (
      hoveredCardIndex > 0 && hoveredCardIndex < currentSectionsOrder.length - 1
    );
  if (position === 'last')
    return (
      hoveredCard === currentSectionsOrder[currentSectionsOrder.length - 1]
    );
};

export const moveCardsIfDraggingOutside = ({
  target,
  sectionsOrder,
  initialColumn,
  initialCard,
  initialSectionsOrder,
}: {
  target: HTMLDivElement;
  sectionsOrder: {
    top: string[];
    left: string[];
    right: string[];
  };
  initialColumn: 'left' | 'right' | 'top' | undefined;
  initialCard: string;
  initialSectionsOrder: string[];
}) => {
  if (!target.id) {
    const initialCardIndex = initialSectionsOrder.indexOf(initialCard);
    const currentColumn =
      initialColumn === 'top'
        ? 'top'
        : ['left', 'right'].filter((column) =>
            sectionsOrder[column as keyof typeof sectionsOrder].includes(
              initialCard
            )
          )[0];
    const currentColumnElement = document.querySelector('#' + currentColumn)!;
    if (initialCardIndex === 0) {
      Array.from(currentColumnElement.children)
        .filter((el) => el.id)
        .slice(currentColumn === 'top' ? 1 : 0)
        .forEach((el) => moveUp(el as HTMLDivElement));
    }
    if (initialCardIndex === initialSectionsOrder.length - 1) {
      placeBackAllCardsFrom(currentColumnElement as HTMLDivElement);
    }
    if (
      initialCardIndex !== 0 &&
      initialCardIndex !== initialSectionsOrder.length - 1
    ) {
      Array.from(currentColumnElement.children).forEach(
        (el) => isDown(el as HTMLDivElement) && placeBack(el as HTMLDivElement)
      );

      Array.from(currentColumnElement.children)
        .slice(initialCardIndex + 1)
        .forEach((el) => moveUp(el as HTMLDivElement));
    }
    (currentColumn === 'left' || currentColumn === 'right') &&
      placeBackAllCardsFrom(
        document.querySelector(
          '#' + (currentColumn === 'left' ? 'right' : 'left')
        )!
      );
  }
};

export const increasePaddingBottom = ({
  sectionsOrder,
  initialColumn,
  currentColumn,
  leftColumn,
  rightColumn,
  position,
}: {
  sectionsOrder: {
    top: string[];
    left: string[];
    right: string[];
  };
  initialColumn: 'left' | 'right' | 'top' | undefined;
  currentColumn: string | undefined;
  leftColumn: HTMLDivElement;
  rightColumn: HTMLDivElement;
  position: 'top' | 'left' | 'right';
}) => {
  if (
    sectionsOrder[initialColumn as keyof typeof sectionsOrder].length <=
    sectionsOrder[currentColumn as keyof typeof sectionsOrder].length
  ) {
    leftColumn.style.paddingBottom = '50px';
    rightColumn.style.paddingBottom = '50px';
  }
  if (
    position !== 'top' &&
    sectionsOrder[initialColumn as keyof typeof sectionsOrder].length ===
      sectionsOrder[currentColumn as keyof typeof sectionsOrder].length &&
    initialColumn === position
  ) {
    leftColumn.style.paddingBottom = '0';
    rightColumn.style.paddingBottom = '0';
  }

  if (
    position !== 'top' &&
    sectionsOrder[initialColumn as keyof typeof sectionsOrder].length >
      sectionsOrder[currentColumn as keyof typeof sectionsOrder].length
  ) {
    leftColumn.style.paddingBottom = '20px';
    rightColumn.style.paddingBottom = '20px';
  }
};

export const getIndexToPutCard = (arrayOfCardPositions: string[]) => {
  if (
    !arrayOfCardPositions.includes('movedUp') &&
    !arrayOfCardPositions.includes('movedDown')
  )
    return arrayOfCardPositions.length;
  return arrayOfCardPositions.filter((el) => el === 'movedUp').length
    ? arrayOfCardPositions.lastIndexOf('movedUp') + 1
    : arrayOfCardPositions.indexOf('movedDown');
};
