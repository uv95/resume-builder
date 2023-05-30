import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from '@/utils/types';
import React from 'react';
import parse from 'html-react-parser';
import style from './List.module.scss';

type Props = {
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: string;
      itemId: string;
    }>
  >;
  list:
    | IEducation[]
    | ISkills[]
    | IProfile[]
    | IProject[]
    | ILanguage[]
    | IProfessionalExperience[];
  section: string;
};

const List = ({ setContentToEdit, section, list }: Props) => {
  return (
    <ul className={style.list}>
      {list.map((item: any) => (
        <div key={item.id}>
          <div className={style.devider}></div>
          <li
            className="p-2 pointer"
            onClick={() => setContentToEdit({ section, itemId: item.id })}
          >
            {item.__typename === 'Education' && (
              <>
                <div className={style.primary}>
                  <strong>{item.degree}</strong>, <i>{item.school}</i>
                </div>
                <p className={style.secondary}>
                  {item.startDate.replaceAll('-', '/')} -{' '}
                  {item.endDate.replaceAll('-', '/')} | {item.city},{' '}
                  {item.country}
                </p>
              </>
            )}
            {item.__typename === 'ProfessionalExperience' && (
              <>
                <div className={style.primary}>
                  <strong>{item.jobTitle}</strong>, <i>{item.employer}</i>
                </div>
                <p className={style.secondary}>
                  {item.startDate.replaceAll('-', '/')} -{' '}
                  {item.endDate.replaceAll('-', '/')} | {item.city},{' '}
                  {item.country}
                </p>
              </>
            )}
            {item.__typename === 'Skills' && (
              <div className="flex gap-1 aligned">
                <div className={style.primary}>
                  <strong>{item.skill}</strong>
                </div>
                <p className={style.secondary}>{item.skillLevel}</p>
              </div>
            )}
            {item.__typename === 'Project' && (
              <>
                <div className={style.primary}>
                  <strong>{item.title}</strong>
                </div>
                <p className={style.secondary}>
                  {item.startDate.replaceAll('-', '/')} -{' '}
                  {item.endDate.replaceAll('-', '/')}
                </p>
              </>
            )}

            {item.__typename === 'Profile' && (
              <>
                <div className={style.primary}>{parse(item.text)}</div>
              </>
            )}
            {item.__typename === 'Language' && (
              <div className="flex gap-1 aligned">
                <div className={style.primary}>
                  <strong>{item.language}</strong>
                </div>
                <p className={style.secondary}>{item.languageLevel}</p>
              </div>
            )}
          </li>
        </div>
      ))}

      <div className={style.devider}></div>
    </ul>
  );
};

export default List;
