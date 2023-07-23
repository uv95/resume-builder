import { ColorsProvider } from '@/context/ColorsContext';
import { ContentProvider } from '@/context/ContentContext';
import { LayoutProvider } from '@/context/LayoutContext';
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
                        <LayoutProvider>
                            {children}
                        </LayoutProvider>
                    </ColorsProvider>
                </ContentProvider>
            </SpacingProvider>
        </ResumeProvider>
    );
};