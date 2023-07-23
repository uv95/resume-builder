import {
    Sections,
} from '@/utils/types/resumeTypes';
import React, { DragEvent, memo } from 'react';
import style from './List.module.scss';
import useContentDnD from '@/hooks/useContentDnD';
import { AdditionalContentItem } from '@/utils/types/contentTypes';
import ListItem from './ListItem';

type Props = {
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  items: AdditionalContentItem[];
  currentSection: Sections | '';
  section: Sections;
  listId: string;
};

const List = ({
    setContentToEdit,
    currentSection,
    section,
    items,
    listId,
}: Props) => {
    const {
        dragEnterHandler,
        dropHandler,
        dragEndHandler,
        setInitialCard,
        itemsOrder,
    } = useContentDnD(section, items);

    const dragStartHandlerListItem = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const currentTarget = e.currentTarget as HTMLDivElement;
        setInitialCard(currentTarget.id);
        currentTarget.style.opacity = '0';
    };
    return (
        <ul
            id={listId}
            className={style.list}
            onDragEnter={(e) => dragEnterHandler(e)}
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e: DragEvent<HTMLUListElement>) => e.preventDefault()}
            onDragEnd={dragEndHandler}
        >
            <div className={style.devider}></div>
            {itemsOrder.map((item: any) => (
                <div
                    key={item.id}
                    onDragStart={(e) => dragStartHandlerListItem(e)}
                    id={item.id}
                    data-position="default"
                    draggable
                    style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                    onClick={() =>
                        setContentToEdit({ section: currentSection, itemId: item.id })
                    }
                >
                    <li className={style.listItem}>
                        <ListItem item={item} section={section}/>
                    </li>
                    <div className={style.devider}></div>
                </div>
            ))}
        </ul>
    );
};

export default memo(List);
