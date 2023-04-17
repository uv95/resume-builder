import { gql } from '@apollo/client';

export const GET_RESUME = gql`
  query getResume($id: ID!) {
    resume(id: $id) {
      id
      personalDetails {
        fullName
        jobTitle
        email
        phone
        address
        additionalInfo {
          dateOfBirth
          drivingLicense
          gender
        }
        links {
          website
          github
          skype
          telegram
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
