export interface IEducation {
  id: string;
  degree: string;
  school: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
  index: number;
  __typename?: string;
}

export interface IPersonalDetails {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  additionalInfo: IAdditionalInfo[];
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
  index: number;
  __typename?: string;
}

export interface IProfile {
  id: string;
  text: string;
  index: number;
  __typename?: string;
}

export interface IProject {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  index: number;
  __typename?: string;
}

export interface ILanguage {
  id: string;
  language: string;
  info: string;
  languageLevel: LanguageLevel;
  index: number;
  __typename?: string;
}
export enum LanguageLevel {
  beginner = 'Beginner (A1)',
  elementary = 'Elementary (A2)',
  limited = 'Limited working proficiency (B1)',
  highlyProficient = 'Highly proficient (B2-C1)',
  fullProficiency = 'Native / full working proficiency (C2)',
  default = '',
}

export interface ISkills {
  id: string;
  skill: string;
  info: string;
  skillLevel: SkillLevel;
  index: number;
  __typename?: string;
}

export enum SkillLevel {
  novice = 'Novice',
  beginner = 'Beginner',
  skillful = 'Skillful',
  experienced = 'Experienced',
  expert = 'Expert',
  default = '',
}

export interface IAdditionalInfo {
  name: string;
  input: string;
}
