import {
    UPDATE_SECTION_NAME_EDUCATION
} from '@/graphql/mutations/education';
import {
    UPDATE_SECTION_NAME_LANGUAGE
} from '@/graphql/mutations/language';
import {
    UPDATE_SECTION_NAME_PROFESSIONAL_EXPERIENCE
} from '@/graphql/mutations/professionalExperience';
import {
    UPDATE_SECTION_NAME_PROFILES
} from '@/graphql/mutations/profile';
import {
    UPDATE_SECTION_NAME_PROJECTS
} from '@/graphql/mutations/project';
import { UPDATE_SECTION_NAME_SKILLS } from '@/graphql/mutations/skills';
import { useMutation } from '@apollo/client';
import {
    IContent,
    IResume,
    Sections,
} from '@/utils/types/resumeTypes';
import { GET_RESUME } from '@/graphql/queries/resume';
import { AdditionalContentItem, AdditionalContentSection } from '@/utils/types/contentTypes';
  
function useUpdateSectionName({
    section,
    resumeId,
}: {
    section: string;
    resumeId: string;
  }) {
    const [updateSectionNameEducation] = useMutation(UPDATE_SECTION_NAME_EDUCATION);
    const [updateSectionNameLanguage] = useMutation(UPDATE_SECTION_NAME_LANGUAGE);
    const [updateSectionNameProfessionalExperience] = useMutation(UPDATE_SECTION_NAME_PROFESSIONAL_EXPERIENCE
    );
    const [updateSectionNameProfile] = useMutation(UPDATE_SECTION_NAME_PROFILES);
    const [updateSectionNameProject] = useMutation(UPDATE_SECTION_NAME_PROJECTS);
    const [updateSectionNameSkills] = useMutation(UPDATE_SECTION_NAME_SKILLS);

    const updateFunctions = [
        {
            section: Sections.EDUCATION,
            fn: updateSectionNameEducation,
            fnName: 'updateSectionNameEducation',
        },
        {
            section: Sections.LANGUAGE,
            fn:updateSectionNameLanguage,
            fnName: 'updateSectionNameLanguage',
        },
        {
            section: Sections.PROFESSIONAL_EXPERIENCE,
            fn: updateSectionNameProfessionalExperience,
            fnName: 'updateSectionNameProfessionalExperience',
        },
        {
            section: Sections.PROFILE,
            fn: updateSectionNameProfile,
            fnName:'updateSectionNameProfile',
        },
        {
            section: Sections.PROJECT,
            fn: updateSectionNameProject,
            fnName: 'updateSectionNameProject',
        },
        {
            section: Sections.SKILLS,
            fn:updateSectionNameSkills,
            fnName: 'updateSectionNameSkills',
        },
    ];
    const updateSectionName = (
        variables:{id:string,sectionName:string, items: AdditionalContentItem[]}
    ) => {
        const { fn, fnName } = updateFunctions.find(
            (item) => section === item.section
        )!;
  
        if (fn)
            return fn({
                variables,
                update(cache, { data }) {
                    const newData = data[fnName];
                    const { resume } = cache.readQuery<{resume:IResume}>({
                        query: GET_RESUME,
                        variables: { id: resumeId },
                    })!;
  
                    cache.writeQuery({
                        query: GET_RESUME,
                        data: {
                            resume: {
                                ...resume,
                                content: {
                                    ...resume.content,
                                    [section]: {
                                        ...resume.content[section as keyof typeof resume.content] as AdditionalContentSection,
                                        sectionName: newData.sectionName
                                    },
                                },
                            },
                        },
                    });
            
                },
            });
        return null;
    };
    return updateSectionName;
}
  
export default useUpdateSectionName;
  