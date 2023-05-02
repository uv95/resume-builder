import { Dispatch } from 'react';

export interface IResume {
  education: IEducation[];
  id: string;
  language: ILanguage[];
  name: string;
  personalDetails: null | IPersonalDetails;
  professionalExperience: IProfessionalExperience[];
  profile: IProfile[];
  project: IProject[];
  skills: ISkills[];
  __typename?: string;
}

export interface IEducation {
  id: string;
  degree: string;
  school: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  __typename?: string;
}

export interface ILanguage {
  id: string;
  language: string;
  info: string;
  languageLevel:
    | 'Beginner (A1)'
    | 'Elementary (A2)'
    | 'Limited working proficiency (B1)'
    | 'Highly proficient (B2-C1)'
    | 'Native / full working proficiency (C2)';
  __typename?: string;
}

export interface IPersonalDetails {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  additionalInfo: IAdditionalInfo;
  links: ILinks;
  __typename?: string;
}

export interface IProfessionalExperience {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  __typename?: string;
}

export interface IProfile {
  id: string;
  text: string;
  __typename?: string;
}

export interface IProject {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  __typename?: string;
}

export interface ISkills {
  id: string;
  skill: string;
  info: string;
  skillLevel: 'Novice' | 'Beginner' | 'Skillful' | 'Experienced' | 'Expert';
  __typename?: string;
}

export interface IAdditionalInfo {
  id: string;
  name: string;
  info: string;
  __typename?: string;
}

export interface ILinks {
  id: string;
  name: string;
  link: string;
  __typename?: string;
}

export interface IResumePageState {
  sectionsOrder: string[];
}

export enum ResumePageActionsKind {
  ADD_SECTION = 'ADD_SECTION',
  REMOVE_SECTION = 'REMOVE_SECTION',
}

export interface IResumePageActions {
  type: ResumePageActionsKind;
  payload: string;
}
export interface IResumePageContext {
  state: IResumePageState;
  dispatch: Dispatch<IResumePageActions>;
}
