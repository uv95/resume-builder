import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        uri: 'http://localhost:8000/graphql',
        cache: new InMemoryCache({
            typePolicies: {
                Content: {
                    fields: {
                        // personalDetails: {
                        //     merge(existing, incoming) {
                        //         return incoming;
                        //     },
                        // },
                   
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
        }),
    });
}

export function initializeApollo(initialState?: any) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.cache.extract();

        const data = merge(initialState, existingCache, {
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });
        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') {
        return _apolloClient;
    }

    if (!apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: any
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}
