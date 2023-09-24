import { UPDATE_PERSONAL_DETAILS } from '@/graphql/mutations/personalDetails';
import { mockResume } from '@/utils/consts/mockResume';
import { renderWithMockedProvider } from '@/__tests__/lib/renderWithMockedProvider';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, test } from 'vitest';
import Content from './Content';

describe('Content', () => {
    afterEach(() => {
        cleanup();
    });

    test('add content btn should be displayed', () => {
        render(<Content/>);
        const addContentButton = screen.getByRole('button', { name: '+ add-content' });
        expect(addContentButton).toBeInTheDocument()
    });

    test('should open modal after clicking add content btn', async () => {
        render(
            <Content/>
        );
        const addContentButton = screen.getByRole('button', { name: '+ add-content' });

        const modal = screen.queryByRole('dialog')
        expect(modal).toBeNull()

        userEvent.click(addContentButton);
        expect(await screen.findByRole('dialog')).toBeInTheDocument()
    });

    test('should close modal when close btn clicked', async () => {
        render(
            <Content/>
        );
        const addContentButton = screen.getByRole('button', { name: '+ add-content' });
        
        userEvent.click(addContentButton);

        const closeButton = await screen.findByRole('button', {name: 'close'})
        expect(closeButton).toBeInTheDocument()

        userEvent.click(closeButton);
       
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    });

    test('should open add language form and close add content modal', async () => {
        renderWithMockedProvider(<Content/>)
      
        const addContentButton = screen.getByRole('button', { name: '+ add-content' });
        
        userEvent.click(addContentButton);

        // example content section
        const addLanguageButton = await screen.findByRole('button', {name: 'content-cards.language'})
        expect(addLanguageButton).toBeInTheDocument()

        userEvent.click(addLanguageButton);
       
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
        expect(await screen.findByRole('form', {name: 'add language.sectionName'})).toBeInTheDocument()
    });

    test('should open personal details form and close it after cancel btn is clicked', async () => {
        renderWithMockedProvider(<Content/>)
      
        const personalDetailsButton = screen.getByRole('button', { name: 'personalDetails.sectionName' });
        expect(personalDetailsButton).toBeInTheDocument()

        userEvent.click(personalDetailsButton);

        await waitFor(() => expect(screen.queryByRole('button', { name: 'personalDetails.sectionName' })).toBeNull())
        expect(await screen.findByRole('form', {name: 'edit personalDetails.sectionName'})).toBeInTheDocument()
        expect(await screen.findByRole('button', {name: 'save'})).toBeInTheDocument()
        expect(await screen.findByRole('button', {name: 'cancel'})).toBeInTheDocument()

        userEvent.click(screen.getByRole('button', {name: 'cancel'}));

        await waitFor(() => expect(screen.queryByRole('form', {name: 'edit personalDetails.sectionName'})).toBeNull())
    });

    test('should open personal details form and close it after cancel btn is clicked', async () => {
        const mutation = {
            request: {
                query: UPDATE_PERSONAL_DETAILS,
                variables: mockResume.content.personalDetails
            },
            result: () => {
                console.log('Mutation complete! 🔮')
                return{ data: {
                    updatePersonalDetails: 
                    mockResume.content.personalDetails
                }} }
        }

        renderWithMockedProvider(<Content/>, mutation)
      
        const personalDetailsButton = screen.getByRole('button', { name: 'personalDetails.sectionName' });

        userEvent.click(personalDetailsButton);

        expect(await screen.findByRole('form', {name: 'edit personalDetails.sectionName'})).toBeInTheDocument()
        
        const saveButton = screen.getByRole('button', {name: 'save'})
        expect(saveButton).toBeInTheDocument()
        expect(screen.getByRole('form', {name: 'edit personalDetails.sectionName'})).toBeInTheDocument()

        userEvent.click(saveButton);

        await waitFor(() => expect(screen.queryByRole('form', {name: 'edit personalDetails.sectionName'})).toBeNull())
    });

});