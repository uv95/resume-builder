import '@/styles/globals.scss';
import '@/styles/utilities.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import useApollo from '@/hooks/useApollo';
import { ResumeProvider } from '@/context/ResumeContext';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config.js'

function App({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps);
    return (
        <ApolloProvider client={client}>
            <ResumeProvider>
                <Component {...pageProps} />
            </ResumeProvider>
        </ApolloProvider>
    );
}

export default appWithTranslation(App,nextI18NextConfig)