import { gql } from '@apollo/client';

export const GET_RESUME = gql`
  query getResume($id: ID!) {
    resume(id: $id) {
      id
      name
      content {
        personalDetails {
          id
          fullName
          jobTitle
          email
          phone
          address
          additionalInfo {
            input
            name
          }
        }
        skills {
          id
          skill
          info
          skillLevel
        }
        language {
          id
          language
          info
          languageLevel
        }
        professionalExperience {
          id
          jobTitle
          employer
          city
          country
          startDate
          endDate
          description
        }
        profile {
          id
          text
        }
        education {
          id
          degree
          school
          city
          country
          startDate
          endDate
          description
        }
        project {
          id
          title
          startDate
          endDate
          description
        }
      }
      settings {
        id
        sectionsOrder
      }
    }
  }
`;

export const GET_RESUMES = gql`
  query getResumes {
    resumes {
      id
      name
    }
  }
`;
