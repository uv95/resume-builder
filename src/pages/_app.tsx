import useApollo from '@/hooks/useApollo';
import ErrorBoundary from '@/providers/ErrorBoundary/ErrorBoundary';
import '@/styles/globals.scss';
import '@/styles/utilities.scss';
import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import nextI18NextConfig from '../../next-i18next.config.js';

function App({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps);
        
    return (
        <ApolloProvider client={client}>
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
        </ApolloProvider>
    );
}

export default appWithTranslation(App, nextI18NextConfig)