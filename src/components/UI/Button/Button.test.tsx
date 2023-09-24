import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';

// expect.extend(matchers)

describe('Button', () => {
    test('should display text', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
});


