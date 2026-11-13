import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { reviews } from '../../../../test/fixtures';
import Reviews from './Reviews';

describe('Reviews', () => {
  test('renders reviewer information, comment and accessible rating', () => {
    render(<Reviews reviews={reviews} />);

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '4 out of 5 stars' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('renders an empty list when there are no reviews', () => {
    render(<Reviews reviews={[]} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
