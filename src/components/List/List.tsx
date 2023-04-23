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
  setContentToEdit: () => void;
  list:
    | IEducation[]
    | ISkills[]
    | IProfile[]
    | IProject[]
    | ILanguage[]
    | IProfessionalExperience[];
};

const List = ({ setContentToEdit, list }: Props) => {
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
          <div key={item.__typename}>
            <div className={style.devider}></div>
            <li className="p-2 pointer" onClick={setContentToEdit}>
              {item[Object.keys(item)[1] as keyof typeof item]}
            </li>
          </div>
        )
      )}

      <div className={style.devider}></div>
    </ul>
  );
};

export default List;
