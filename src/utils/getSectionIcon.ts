import skills from '../icons/skills.svg';
import work from '../icons/work.svg';
import education from '../icons/education.svg';
import project from '../icons/project.svg';
import profile from '../icons/profile.svg';
import language from '../icons/world.svg';
import { Sections } from './types/resumeTypes';

export const getSectionIcon = (section: string) => {
  if (section === Sections.LANGUAGE) return language;
  if (section === Sections.SKILLS) return skills;
  if (section === Sections.PROFESSIONAL_EXPERIENCE) return work;
  if (section === Sections.EDUCATION) return education;
  if (section === Sections.PROJECT) return project;
  if (section === Sections.PROFILE) return profile;
};
