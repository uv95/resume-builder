import '@/styles/globals.scss';
import '@/styles/utilities.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import useApollo from '@/hooks/useApollo';
import { ResumeProvider } from '@/context/ResumeContext';

export default function App({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps);
    return (
        <ApolloProvider client={client}>
            <ResumeProvider>
                <Component {...pageProps} />;
            </ResumeProvider>
        </ApolloProvider>
    );
}
