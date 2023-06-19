import { formatLevelProp } from './formatLevelProp';
import { removeTypename } from './removeTypename';
import { IResume } from './types';

export const getInitialValues = (
  inputData: any,
  resume: IResume,
  itemId: string
) => {
  if (inputData.name === 'personalDetails') {
    if (resume.content.personalDetails) {
      const personalDetails = {
        ...resume.content.personalDetails,
        additionalInfo: resume.content.personalDetails.additionalInfo.map(
          (item) => removeTypename(item)
        ),
      };

      return removeTypename(personalDetails);
    } else {
      const emptyValues = inputData.inputs
        .map((input: any) => input.name)
        .reduce((acc: any, curr: any) => ((acc[curr] = ''), acc), {});
      return { ...emptyValues, additionalInfo: [] };
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
      currentItem.skillLevel = formatLevelProp({
        section: 'skills',
        item: currentItem,
      });
    if (inputData.name === 'language')
      currentItem.languageLevel = formatLevelProp({
        section: 'language',
        item: currentItem,
      });

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
    Object.values(inputs).filter(
      (val) => val !== '' && val !== 'default' && val.length
    ).length === 0
  );
};
