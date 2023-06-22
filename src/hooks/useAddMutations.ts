import { ADD_EDUCATION } from '@/graphql/mutations/education';
import { ADD_LANGUAGE } from '@/graphql/mutations/language';
import { ADD_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import { ADD_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperience';
import { ADD_PROFILE } from '@/graphql/mutations/profile';
import { ADD_PROJECT } from '@/graphql/mutations/project';
import { ADD_SKILL } from '@/graphql/mutations/skills';
import { useMutation } from '@apollo/client';
import { Sections } from '@/utils/types/resumeTypes';
import { GET_RESUME } from '@/graphql/queries/resume';
import useUpdateSettings from './useUpdateSettings';
import { AdditionalContentItem } from '@/utils/types/contentTypes';

function useAddMutations(section: Sections, resumeId: string) {
    const [addPersonalDetails] = useMutation(ADD_PERSONAL_DETAILS);
    const [addEducation] = useMutation(ADD_EDUCATION);
    const [addLanguage] = useMutation(ADD_LANGUAGE);
    const [addProfessionalExperience] = useMutation(ADD_PROFESSIONAL_EXPERIENCE);
    const [addProfile] = useMutation(ADD_PROFILE);
    const [addProject] = useMutation(ADD_PROJECT);
    const [addSkill] = useMutation(ADD_SKILL);

    const { addToSectionsOrder } = useUpdateSettings();

    const addFunctions = [
        {
            sectionName: Sections.PERSONAL_DETAILS,
            fn: addPersonalDetails,
            fnName: 'addPersonalDetails',
        },
        {
            sectionName: Sections.EDUCATION,
            fn: addEducation,
            fnName: 'addEducation',
        },
        { sectionName: Sections.LANGUAGE, fn: addLanguage, fnName: 'addLanguage' },
        {
            sectionName: Sections.PROFESSIONAL_EXPERIENCE,
            fn: addProfessionalExperience,
            fnName: 'addProfessionalExperience',
        },
        { sectionName: Sections.PROFILE, fn: addProfile, fnName: 'addProfile' },
        { sectionName: Sections.PROJECT, fn: addProject, fnName: 'addProject' },
        { sectionName: Sections.SKILLS, fn: addSkill, fnName: 'addSkill' },
    ];
    const addContent = (variables: AdditionalContentItem) => {
        const { fn, fnName, sectionName } = addFunctions.find(
            (item) => section === item.sectionName
        )!;

        if (fn)
            return fn({
                variables: { resumeId, ...variables },
                update(cache, { data }) {
                    const newData = data[fnName];
                    const { resume } = cache.readQuery({
                        query: GET_RESUME,
                        variables: { id: resumeId },
                    })!;

                    sectionName !== Sections.PERSONAL_DETAILS &&
            addToSectionsOrder(sectionName);

                    cache.writeQuery({
                        query: GET_RESUME,
                        data: {
                            resume: {
                                ...resume,
                                content: {
                                    ...resume.content,
                                    [sectionName]:
                    sectionName === Sections.PERSONAL_DETAILS
                        ? newData
                        : {...resume.content[sectionName],
                            items: [...resume.content[sectionName].items, newData]},
                                },
                            },
                        },
                    });
                },
            });
        return null;
    };
    return addContent;
}

export default useAddMutations;
