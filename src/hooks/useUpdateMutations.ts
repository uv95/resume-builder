import {
    UPDATE_EDUCATION_ORDER,
    UPDATE_EDUCATION,
} from '@/graphql/mutations/education';
import {
    UPDATE_LANGUAGES_ORDER,
    UPDATE_LANGUAGE,
} from '@/graphql/mutations/language';
import { UPDATE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import {
    UPDATE_PROFESSIONAL_EXPERIENCE_ORDER,
    UPDATE_PROFESSIONAL_EXPERIENCE,
} from '@/graphql/mutations/professionalExperience';
import {
    UPDATE_PROFILES_ORDER,
    UPDATE_PROFILE,
} from '@/graphql/mutations/profile';
import {
    UPDATE_PROJECTS_ORDER,
    UPDATE_PROJECT,
} from '@/graphql/mutations/project';
import { UPDATE_SKILLS_ORDER, UPDATE_SKILL } from '@/graphql/mutations/skills';
import { useMutation } from '@apollo/client';
import {
    Sections,
} from '@/utils/types/resumeTypes';
import { GET_RESUME } from '@/graphql/queries/resume';
import { AdditionalContentItem } from '@/utils/types/contentTypes';

function useUpdateMutations({
    section,
    updateOrder,
    resumeId,
}: {
  section: Sections;
  updateOrder?: boolean;
  resumeId: string;
}) {
    const [updatePersonalDetails] = useMutation(UPDATE_PERSONAL_DETAILS);

    const [updateEducation] = useMutation(UPDATE_EDUCATION);
    const [updateEducationsOrder] = useMutation(UPDATE_EDUCATION_ORDER);

    const [updateLanguage] = useMutation(UPDATE_LANGUAGE);
    const [updateLanguagesOrder] = useMutation(UPDATE_LANGUAGES_ORDER);

    const [updateProfessionalExperience] = useMutation(
        UPDATE_PROFESSIONAL_EXPERIENCE
    );
    const [updateProfessionalExperienceOrder] = useMutation(
        UPDATE_PROFESSIONAL_EXPERIENCE_ORDER
    );
    const [updateProfile] = useMutation(UPDATE_PROFILE);
    const [updateProfilesOrder] = useMutation(UPDATE_PROFILES_ORDER);

    const [updateProject] = useMutation(UPDATE_PROJECT);
    const [updateProjectsOrder] = useMutation(UPDATE_PROJECTS_ORDER);

    const [updateSkill] = useMutation(UPDATE_SKILL);
    const [updateSkillsOrder] = useMutation(UPDATE_SKILLS_ORDER);

    const updateFunctions = [
        {
            sectionName: Sections.PERSONAL_DETAILS,
            fn: updatePersonalDetails,
            fnName: 'updatePersonalDetails',
        },
        {
            sectionName: Sections.EDUCATION,
            fn: updateOrder ? updateEducationsOrder : updateEducation,
            fnName: updateOrder ? 'updateEducationsOrder' : 'updateEducation',
        },
        {
            sectionName: Sections.LANGUAGE,
            fn: updateOrder ? updateLanguagesOrder : updateLanguage,
            fnName: updateOrder ? 'updateLanguagesOrder' : 'updateLanguage',
        },
        {
            sectionName: Sections.PROFESSIONAL_EXPERIENCE,
            fn: updateOrder
                ? updateProfessionalExperienceOrder
                : updateProfessionalExperience,
            fnName: updateOrder
                ? 'updateProfessionalExperienceOrder'
                : 'updateProfessionalExperience',
        },
        {
            sectionName: Sections.PROFILE,
            fn: updateOrder ? updateProfilesOrder : updateProfile,
            fnName: updateOrder ? 'updateProfilesOrder' : 'updateProfile',
        },
        {
            sectionName: Sections.PROJECT,
            fn: updateOrder ? updateProjectsOrder : updateProject,
            fnName: updateOrder ? 'updateProjectsOrder' : 'updateProject',
        },
        {
            sectionName: Sections.SKILLS,
            fn: updateOrder ? updateSkillsOrder : updateSkill,
            fnName: updateOrder ? 'updateSkillsOrder' : 'updateSkill',
        },
    ];
    const updateContent = (
        variables:
      | AdditionalContentItem
      | {
          items: AdditionalContentItem[];
        }
    ) => {
        const { fn, fnName } = updateFunctions.find(
            (item) => section === item.sectionName
        )!;

        if (fn)
            return fn({
                variables,
                update(cache, { data }) {
                    const newData = data[fnName];
                    const { resume } = cache.readQuery({
                        query: GET_RESUME,
                        variables: { id: resumeId },
                    })!;

                    if (!updateOrder) {
                        const itemId = (variables as AdditionalContentItem).id;

                        cache.writeQuery({
                            query: GET_RESUME,
                            data: {
                                resume: {
                                    ...resume,
                                    content: {
                                        ...resume.content,
                                        [section]:
                      section === Sections.PERSONAL_DETAILS
                          ? newData
                          : {...resume.content[section],
                              items:[
                                  ...resume.content[section].items.map((item: any) =>
                                      item.id === itemId ? newData : item
                                  ),
                              ]},
                                    },
                                },
                            },
                        });
                    }
                    if (updateOrder) {
                        cache.writeQuery({
                            query: GET_RESUME,
                            data: {
                                resume: {
                                    ...resume,
                                    content: {
                                        ...resume.content,
                                        [section]: {
                                            ...resume.content[section],
                                            items: newData
                                        },
                                    },
                                },
                            },
                        });
                    }
                },
            });
        return null;
    };
    return updateContent;
}

export default useUpdateMutations;
