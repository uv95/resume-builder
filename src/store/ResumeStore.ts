import { makeAutoObservable } from 'mobx';
import {
  IEducation,
  ILanguage,
  IProfessionalExperience,
  IProfile,
  IProject,
  ISkills,
} from '../utils/types';

class ResumeStore {
  sectionsOrder: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addSection(section: string) {
    return !this.sectionsOrder.includes(section)
      ? this.sectionsOrder.push(section)
      : this.sectionsOrder;
  }
  removeSection(
    section: string,
    updatedSection:
      | IEducation[]
      | ISkills[]
      | IProfile[]
      | IProject[]
      | ILanguage[]
      | IProfessionalExperience[]
  ) {
    return (this.sectionsOrder = !updatedSection.length
      ? this.sectionsOrder.filter((item) => item !== section)
      : this.sectionsOrder);
  }
}

const resumeStore = new ResumeStore();

export default resumeStore;
