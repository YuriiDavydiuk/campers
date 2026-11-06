import '@testing-library/jest-dom/jest-globals';

import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Loading from './Loading';

jest.mock('../../assets/loading-spinner.png', () => 'loading-spinner.png');

describe('Loading', () => {
  test('renders an accessible loading status', () => {
    render(<Loading />);

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Loading tracks...');
    expect(status).toHaveTextContent(/Please wait while we fetch the best\s*travel trucks for you/);
  });

  test('renders the spinner as a decorative image', () => {
    const { container } = render(<Loading />);

    const spinner = container.querySelector('img');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('alt', '');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
