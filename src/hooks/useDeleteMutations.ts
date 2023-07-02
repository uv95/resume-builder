import { DELETE_EDUCATION } from '@/graphql/mutations/education';
import { DELETE_LANGUAGE } from '@/graphql/mutations/language';
import { DELETE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import { DELETE_PROFESSIONAL_EXPERIENCE } from '@/graphql/mutations/professionalExperience';
import { DELETE_PROFILE } from '@/graphql/mutations/profile';
import { DELETE_PROJECT } from '@/graphql/mutations/project';
import { DELETE_SKILL } from '@/graphql/mutations/skills';
import { useMutation } from '@apollo/client';
import {  IResume, Sections } from '@/utils/types/resumeTypes';
import { GET_RESUME } from '@/graphql/queries/resume';
import useUpdateSettings from './useUpdateSettings';
import { AdditionalContentItem, AdditionalContentSection } from '@/utils/types/contentTypes';

function useDeleteMutations(section: Sections, resumeId: string) {
    const [deletePersonalDetails] = useMutation(DELETE_PERSONAL_DETAILS);
    const [deleteEducation] = useMutation(DELETE_EDUCATION);
    const [deleteLanguage] = useMutation(DELETE_LANGUAGE);
    const [deleteProfessionalExperience] = useMutation(
        DELETE_PROFESSIONAL_EXPERIENCE
    );
    const [deleteProfile] = useMutation(DELETE_PROFILE);
    const [deleteProject] = useMutation(DELETE_PROJECT);
    const [deleteSkill] = useMutation(DELETE_SKILL);

    const { removeFromSectionsOrder } = useUpdateSettings();

    const deleteFunctions = [
        {
            sectionName: Sections.PERSONAL_DETAILS,
            fn: deletePersonalDetails,
            fnName: 'deletePersonalDetails',
        },
        {
            sectionName: Sections.EDUCATION,
            fn: deleteEducation,
            fnName: 'deleteEducation',
        },
        {
            sectionName: Sections.LANGUAGE,
            fn: deleteLanguage,
            fnName: 'deleteLanguage',
        },
        {
            sectionName: Sections.PROFESSIONAL_EXPERIENCE,
            fn: deleteProfessionalExperience,
            fnName: 'deleteProfessionalExperience',
        },
        {
            sectionName: Sections.PROFILE,
            fn: deleteProfile,
            fnName: 'deleteProfile',
        },
        {
            sectionName: Sections.PROJECT,
            fn: deleteProject,
            fnName: 'deleteProject',
        },
        { sectionName: Sections.SKILLS, fn: deleteSkill, fnName: 'deleteSkill' },
    ];
    const deleteContent = (itemId: string) => {
        const { fn, fnName, sectionName } = deleteFunctions.find(
            (item) => section === item.sectionName
        )!;

        if (fn)
            return fn({
                variables: { id: itemId },
                update(cache, { data }) {
                    const deletedData = data[fnName];
                    const { resume } = cache.readQuery<{resume:IResume}>({
                        query: GET_RESUME,
                        variables: { id: resumeId },
                    })!;

                    //  ---update sections order---
                    removeFromSectionsOrder(sectionName);
                    // ---update sections order---

                    cache.writeQuery({
                        query: GET_RESUME,
                        data: {
                            resume: {
                                ...resume,
                                content: {
                                    ...resume.content,
                                    [sectionName]: {
                                        ...resume.content[sectionName],
                                        items: (resume.content[sectionName] as AdditionalContentSection).items.filter(
                                            (item: AdditionalContentItem) => item.id !== deletedData.id
                                        )},
                                },
                            },
                        },
                    });
                },
            });
        return null;
    };
    return deleteContent;
}

export default useDeleteMutations;
