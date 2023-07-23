import { ColorsProvider } from '@/context/ColorsContext';
import { ContentProvider } from '@/context/ContentContext';
import { ResumeProvider } from '@/context/ResumeContext';
import { SpacingProvider } from '@/context/SpacingContext';
import { ReactNode } from 'react';
  
interface ProvidersProps {
  children: ReactNode;
}
  
export const Providers = ({ children }: ProvidersProps) => {
    return (
        <ResumeProvider>
            <SpacingProvider>
                <ContentProvider>
                    <ColorsProvider>
                        {children}
                    </ColorsProvider>
                </ContentProvider>
            </SpacingProvider>
        </ResumeProvider>
    );
};