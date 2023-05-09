import { removeTypename } from './removeTypename';
import { IResume } from './types';

export const getInitialValues = (
  inputData: any,
  resume: IResume,
  itemId: string
) => {
  if (inputData.name === 'personalDetails') {
    if (resume.content.personalDetails)
      return removeTypename(resume.content.personalDetails);
    else {
      const emptyValues = inputData.inputs
        .map((input: any) => input.name)
        .reduce((acc: any, curr: any) => ((acc[curr] = ''), acc), {});
      return emptyValues;
    }
  }
  let currentSection: any;
  currentSection =
    resume.content[inputData.name as keyof typeof resume.content];
  const currentItem = removeTypename(
    currentSection.find((item: any) => item.id === itemId)
  );
  if (currentItem) {
    if (inputData.name === 'skills')
      switch (currentItem.skillLevel) {
        case 'Novice':
          currentItem.skillLevel = 'novice';
          break;
        case 'Beginner':
          currentItem.skillLevel = 'beginner';
          break;
        case 'Skillful':
          currentItem.skillLevel = 'skillful';
          break;
        case 'Experienced':
          currentItem.skillLevel = 'experienced';
          break;
        case 'Expert':
          currentItem.skillLevel = 'expert';
          break;
        default:
          currentItem.skillLevel = 'default';
      }

    if (inputData.name === 'language')
      switch (currentItem.languageLevel) {
        case 'Beginner (A1)':
          currentItem.languageLevel = 'beginner';
          break;
        case 'Elementary (A2)':
          currentItem.languageLevel = 'elementary';
          break;
        case 'Limited working proficiency (B1)':
          currentItem.languageLevel = 'limited';
          break;
        case 'Highly proficient (B2-C1)':
          currentItem.languageLevel = 'highlyProficient';
        case 'Native / full working proficiency (C2)':
          currentItem.languageLevel = 'fullProficiency';
          break;
        default:
          currentItem.languageLevel = 'default';
      }

    return currentItem;
  } else {
    const emptyValues = inputData.inputs
      .map((input: any) => input.name)
      .reduce((acc: any, curr: any) => ((acc[curr] = ''), acc), {});
    if (emptyValues.hasOwnProperty('skillLevel'))
      emptyValues.skillLevel = 'default';
    if (emptyValues.hasOwnProperty('languageLevel'))
      emptyValues.languageLevel = 'default';
    return emptyValues;
  }
};

export const isInputsEmpty = (inputs: Object) => {
  return (
    Object.values(inputs).filter((val) => val !== '' && val !== 'default')
      .length === 0
  );
};
