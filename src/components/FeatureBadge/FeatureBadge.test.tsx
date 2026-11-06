import '@testing-library/jest-dom/jest-globals';

import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import FeatureBadge from './FeatureBadge';

describe('FeatureBadge', () => {
  test('renders the provided label', () => {
    render(<FeatureBadge icon="/icons/automatic.svg" label="Automatic" />);

    expect(screen.getByText('Automatic')).toBeInTheDocument();
  });

  test('renders the icon as a decorative image', () => {
    const { container } = render(<FeatureBadge icon="/icons/automatic.svg" label="Automatic" />);

    const icon = container.querySelector('img');

    expect(icon).toHaveAttribute('src', '/icons/automatic.svg');
    expect(icon).toHaveAttribute('alt', '');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });
});
