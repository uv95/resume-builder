import { ContentProvider } from '@/context/ContentContext';
import { ResumeProvider } from '@/context/ResumeContext';
import { ColorsProvider, HeaderProvider, HeadingProvider, LayoutProvider, SpacingProvider, SubtitleProvider } from '@/context/settings';
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
                            <SubtitleProvider>
                                <HeaderProvider>
                                    <HeadingProvider>
                                        {children}
                                    </HeadingProvider>
                                </HeaderProvider>
                            </SubtitleProvider>
                        </LayoutProvider>
                    </ColorsProvider>
                </ContentProvider>
            </SpacingProvider>
        </ResumeProvider>
    );
};