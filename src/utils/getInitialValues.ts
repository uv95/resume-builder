import { formatLevelProp } from './formatLevelProp';
import { removeTypename } from './removeTypename';
import { AdditionalContentItem, AdditionalContentSection } from './types/contentTypes';
import {  IContent, Sections } from './types/resumeTypes';

export const getInitialValues = (
    inputData: any,
    content: IContent,
    itemId: string
) => {
    const sectionName:Sections=inputData.name;
    if (sectionName === Sections.PERSONAL_DETAILS) {
        if (content.personalDetails) {
            const personalDetails = {
                ...content.personalDetails,
                additionalInfo: content.personalDetails.additionalInfo.map(
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
    const currentSectionItems: AdditionalContentItem[] = 
   (content[sectionName as keyof typeof content] as AdditionalContentSection).items;
    const currentItem = removeTypename(
        currentSectionItems.find((item: AdditionalContentItem) => item.id === itemId) as AdditionalContentItem
    );
    if (currentItem) {
        if (sectionName === Sections.SKILLS)
            currentItem.skillLevel = formatLevelProp({
                section: Sections.SKILLS,
                item: currentItem,
            });
        if (sectionName === 'language')
            currentItem.languageLevel = formatLevelProp({
                section: Sections.LANGUAGE,
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
