import '@testing-library/jest-dom/jest-globals';

import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('Button', () => {
  test('renders children and uses default props', () => {
    render(<Button>Search</Button>);

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('button', 'primary');
  });

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Search</Button>);

    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('supports native button props', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button type="submit" disabled onClick={handleClick}>
        Send
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Send' });

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies variant, fullWidth and custom className', () => {
    render(
      <Button variant="secondary" fullWidth className="customClass">
        Clear filters
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Clear filters' });

    expect(button).toHaveClass('button', 'secondary', 'fullWidth', 'customClass');
    expect(button).not.toHaveClass('primary');
  });
});
