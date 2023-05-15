import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from '@/utils/types';
import React from 'react';
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
      {list.map(
        (
          item:
            | IEducation
            | ISkills
            | IProfile
            | IProject
            | ILanguage
            | IProfessionalExperience
        ) => (
          <div key={item.id}>
            <div className={style.devider}></div>
            <li
              className="p-2 pointer"
              onClick={() => setContentToEdit({ section, itemId: item.id })}
            >
              {item[Object.keys(item)[2] as keyof typeof item]}
            </li>
          </div>
        )
      )}

      <div className={style.devider}></div>
    </ul>
  );
};

export default List;
