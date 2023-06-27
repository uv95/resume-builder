interface ContentItem {
  id: string;
  index: number;
  __typename?: string;
}

export interface IEducationItem extends ContentItem {
  degree: string;
  school: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IAdditionalInfo {
  name: string;
  input: string;
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

export interface IProfessionalExperienceItem extends ContentItem {
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IProfileItem extends ContentItem {
  text: string;
}

export interface IProjectItem extends ContentItem {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ILanguageItem extends ContentItem {
  language: string;
  info: string;
  languageLevel: LanguageLevel;
}

export enum LanguageLevel {
  beginner = 'Beginner (A1)',
  elementary = 'Elementary (A2)',
  limited = 'Limited working proficiency (B1)',
  highlyProficient = 'Highly proficient (B2-C1)',
  fullProficiency = 'Native / full working proficiency (C2)',
  default = '',
}

export interface ISkillsItem extends ContentItem {
  skill: string;
  info: string;
  skillLevel: SkillLevel;
}

export enum SkillLevel {
  beginner = 'Beginner',
  novice = 'Novice',
  skillful = 'Skillful',
  experienced = 'Experienced',
  expert = 'Expert',
  default = '',
}

export type  AdditionalContentItem =
  | ILanguageItem
  | ISkillsItem
  | IProfessionalExperienceItem
  | IProjectItem
  | IEducationItem
  | IProfileItem;

export interface AdditionalContentSection {
  id:string;
  sectionName: string;
  items:  AdditionalContentItem[]
}

export interface ILanguage extends AdditionalContentSection{
  items: ILanguageItem[]
}
export interface IEducation extends AdditionalContentSection{
  items: IEducationItem[]
}
export interface IProfessionalExperience extends AdditionalContentSection{
  items: IProfessionalExperienceItem[]
}
export interface IProfile extends AdditionalContentSection{
  items: IProfileItem[]
}
export interface IProject extends AdditionalContentSection{
  items: IProjectItem[]
}
export interface ISkills extends AdditionalContentSection{
  items: ISkillsItem[]
}
