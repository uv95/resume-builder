import {
  IterableSectionsArraysType,
  Sections,
} from '@/utils/types/resumeTypes';
import React, { DragEvent } from 'react';
import parse from 'html-react-parser';
import style from './List.module.scss';
import useContentDnD from '@/hooks/useContentDnD';
import { LanguageLevel, SkillLevel } from '@/utils/types/contentTypes';

type Props = {
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  list: IterableSectionsArraysType;
  currentSection: Sections | '';
  section: Sections;
  listId: string;
};

const List = ({
  setContentToEdit,
  currentSection,
  section,
  list,
  listId,
}: Props) => {
  const {
    dragEnterHandler,
    dropHandler,
    dragEndHandler,
    setInitialCard,
    itemsOrder,
  } = useContentDnD(section, list);

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
      onDragEnd={(e) => dragEndHandler(e)}
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
            {section === Sections.EDUCATION && (
              <>
                <div className={style.primary}>
                  <b>{item.degree}</b>, <i>{item.school}</i>
                </div>
                <p className={style.secondary}>
                  {item.startDate.replaceAll('-', '/')} -{' '}
                  {item.endDate.replaceAll('-', '/')} | {item.city},{' '}
                  {item.country}
                </p>
              </>
            )}
            {section === Sections.PROFESSIONAL_EXPERIENCE && (
              <>
                <div className={style.primary}>
                  <b>{item.jobTitle}</b>, <i>{item.employer}</i>
                </div>
                <p className={style.secondary}>
                  {item.startDate.replaceAll('-', '/')} -{' '}
                  {item.endDate.replaceAll('-', '/')} | {item.city},{' '}
                  {item.country}
                </p>
              </>
            )}
            {section === Sections.SKILLS && (
              <div className="flex gap-1 aligned">
                <div className={style.primary}>
                  <b>{item.skill}</b>
                </div>
                <p className={style.secondary}>
                  {SkillLevel[item.skillLevel as keyof typeof SkillLevel] ||
                    item.skillLevel}
                </p>
              </div>
            )}
            {section === Sections.PROJECT && (
              <>
                <div className={style.primary}>
                  <b>{item.title}</b>
                </div>
                <p className={style.secondary}>
                  {item.startDate.replaceAll('-', '/')} -{' '}
                  {item.endDate.replaceAll('-', '/')}
                </p>
              </>
            )}

            {section === Sections.PROFILE && (
              <>
                <div className={style.primary}>{parse(item.text)}</div>
              </>
            )}
            {section === Sections.LANGUAGE && (
              <div className="flex gap-1 aligned">
                <div className={style.primary}>
                  <b>{item.language}</b>
                </div>
                <p className={style.secondary}>
                  {LanguageLevel[
                    item.languageLevel as keyof typeof LanguageLevel
                  ] || item.languageLevel}
                </p>
              </div>
            )}
          </li>
          <div className={style.devider}></div>
        </div>
      ))}
    </ul>
  );
};

export default List;
