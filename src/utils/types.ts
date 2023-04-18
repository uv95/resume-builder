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
}

export interface IEducation {}

export interface ILanguage {
  language: string;
  info: string;
  languageLevel:
    | 'Beginner (A1)'
    | 'Elementary (A2)'
    | 'Limited working proficiency (B1)'
    | 'Highly proficient (B2-C1)'
    | 'Native / full working proficiency (C2)';
}

export interface IPersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  additionalInfo: IAdditionalInfo;
  links: ILinks;
}

export interface IProfessionalExperience {
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IProfile {
  text: string;
}

export interface IProject {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ISkills {
  skill: string;
  info: string;
  skillLevel: 'Novice' | 'Beginner' | 'Skillful' | 'Experienced' | 'Expert';
}

export interface IAdditionalInfo {
  info: string;
}

export interface ILinks {
  link: string;
}
