import { gql } from '@apollo/client';

export const GET_RESUME = gql`
  query getResume($id: ID!) {
    resume(id: $id) {
      id
      name
      personalDetails {
        fullName
        jobTitle
        email
        phone
        address
        additionalInfo {
          info
        }
        links {
          link
        }
      }
      skills {
        skill
        info
        skillLevel
      }
      language {
        language
        info
        languageLevel
      }
      professionalExperience {
        jobTitle
        employer
        city
        country
        startDate
        endDate
        description
      }
      profile {
        text
      }
      education {
        degree
        school
        city
        country
        startDate
        endDate
        description
      }
      project {
        title
        startDate
        endDate
        description
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
