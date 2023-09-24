import { GET_RESUME } from "@/graphql/queries/resume";
import { Providers } from "@/providers/Providers";
import { ResumeDataSetter } from "@/providers/ResumeDataSetter/ResumeDataSetter";
import { IResume } from "@/utils/types/resumeTypes";
import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { mockResume } from "../../utils/consts/mockResume";
import i18nForTests from '../../utils/consts/i18nForTests';

const cache = new InMemoryCache({
    typePolicies: {
        PersonalDetails: {
            fields: {
                additionalInfo: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
           
            },
        },
        Skills:  {
            fields:{
                items: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }

            }
        },
        Language:  {
            fields:{
                items: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }

            }
        },
        ProfessionalExperience:  {
            fields:{
                items: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }

            }
        },
        Profile:  {
            fields:{
                items: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }

            }
        },
        Project:  {
            fields:{
                items: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }

            }
        },
        Education:  {
            fields:{
                items: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }

            }
        }
    },
})

const mocks=[{
    request: {
        query: GET_RESUME,
        variables: {
            id: "64ed9161ee1781214bf876de",
        },
    },
    result: { data: {
        resume: mockResume,
    }
    },
}]

export const renderWithMockedProvider = (component: ReactNode, additionalMock?: MockedResponse<Record<string, any>, Record<string, any>>) => {
    return (
        render(<MockedProvider addTypename={additionalMock ? true : false} mocks={additionalMock ? [...mocks, additionalMock, ...mocks] : mocks} >
            <I18nextProvider i18n={i18nForTests}>
                <Providers>
                    <ResumeDataSetter resumeData={mockResume as IResume}>
                        {component}
                    </ResumeDataSetter>
                </Providers>
            </I18nextProvider>
        </MockedProvider>
        ))
}