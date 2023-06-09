import '@/styles/globals.scss';
import '@/styles/utilities.scss';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import useApollo from '@/hooks/useApollo';
import { ResumeProvider } from '@/context/ResumeContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={HTML5Backend}>
        <ResumeProvider>
          <Component {...pageProps} />;
        </ResumeProvider>
      </DndProvider>
    </ApolloProvider>
  );
}
