import React, { DragEvent } from 'react';
import { camelCaseToString } from '@/utils/camelCaseToString';
import Image from 'next/image';

import style from './Layout.module.scss';
import { addTransitionToAllCardsFrom } from '@/utils/dragAndDropUtilityFunctions';
import { Position } from '@/utils/types/settingsTypes';

type Props = {
  section: string;
  column: Position;
  sectionsOrder: string[];
  icon: string;
  setInitialColumn: React.Dispatch<React.SetStateAction<Position | undefined>>;
  setPreviousColumn: React.Dispatch<React.SetStateAction<Position | undefined>>;
  previousColumn: Position | undefined;
  setInitialCard: React.Dispatch<React.SetStateAction<string>>;
  initialCard: string;
};

const DraggableCard = ({
    section,
    icon,
    column,
    setInitialColumn,
    setPreviousColumn,
    setInitialCard,
    initialCard,
}: Props) => {
    const columns = {
        left: document.querySelector('#left') as HTMLDivElement,
        right: document.querySelector('#right') as HTMLDivElement,
    };

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const currentTarget = e.currentTarget as HTMLDivElement;
        if (initialCard === currentTarget.id) return;

        setPreviousColumn(column);
    };

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const currentTarget = e.currentTarget as HTMLDivElement;
        setInitialColumn(column);
        setInitialCard(currentTarget.id);
        setPreviousColumn(column);
        currentTarget.style.opacity = '0';
        if (columns.left) {
            addTransitionToAllCardsFrom(columns.left);
            addTransitionToAllCardsFrom(columns.right);
            columns.left.style.transition = 'all 0.2s';
            columns.right.style.transition = 'all 0.2s';
        }
    };

    return (
        <div
            className={`draggableCard ${style.draggableCard}`}
            data-position="default"
            draggable
            id={section}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e)}
        >
            <div
                className="flex"
                style={{
                    height: '100%',
                    pointerEvents: 'none',
                }}
            >
                <div style={{ margin: '1rem 2rem' }} className="flex gap-1 aligned">
                    <Image
                        src={icon}
                        width="20"
                        height="20"
                        alt="icon"
                        draggable={false}
                    />
                    <strong> {camelCaseToString(section)}</strong>
                </div>
            </div>
        </div>
    );
};

export default DraggableCard;
