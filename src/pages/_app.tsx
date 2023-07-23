import '@/styles/globals.scss';
import '@/styles/utilities.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import useApollo from '@/hooks/useApollo';
import { ResumeProvider } from '@/context/ResumeContext';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'
import ErrorBoundary from '@/providers/ErrorBoundary/ErrorBoundary';
import { SpacingProvider } from '@/context/SpacingContext';
import { ContentProvider } from '@/context/ContentContext';
import { ColorsProvider } from '@/context/ColorsContext';

function App({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps);
    return (
        <ApolloProvider client={client}>
            <ErrorBoundary>
                <ResumeProvider>
                    <ContentProvider>
                        <SpacingProvider>
                            <ColorsProvider>
                                <Component {...pageProps} />
                            </ColorsProvider>
                        </SpacingProvider>
                    </ContentProvider>
                </ResumeProvider>
            </ErrorBoundary>
        </ApolloProvider>
    );
}

export default appWithTranslation(App,nextI18NextConfig)