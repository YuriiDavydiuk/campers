import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createBookingRequest } from '../../../../services/campersService';
import { bookingResponse } from '../../../../test/fixtures';
import { renderWithProviders } from '../../../../test/renderWithProviders';
import BookingForm from './BookingForm';

jest.mock('../../../../services/campersService');

const mockedCreateBookingRequest = jest.mocked(createBookingRequest);

describe('BookingForm', () => {
  beforeEach(() => {
    mockedCreateBookingRequest.mockReset();
  });

  test('shows required field errors', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookingForm camperId="camper-1" />);

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email.')).toBeInTheDocument();
    expect(mockedCreateBookingRequest).not.toHaveBeenCalled();
  });

  test('rejects invalid name and email values', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookingForm camperId="camper-1" />);

    await user.type(screen.getByPlaceholderText('Name*'), '12345');
    await user.type(screen.getByPlaceholderText('Email*'), 'wrong-email');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your email.')).toBeInTheDocument();
    expect(mockedCreateBookingRequest).not.toHaveBeenCalled();
  });

  test('submits valid data, shows success and resets the form', async () => {
    const user = userEvent.setup();
    mockedCreateBookingRequest.mockResolvedValue(bookingResponse);
    renderWithProviders(<BookingForm camperId="camper-1" />);

    const nameInput = screen.getByPlaceholderText('Name*');
    const emailInput = screen.getByPlaceholderText('Email*');
    await user.type(nameInput, 'Alice');
    await user.type(emailInput, 'alice@example.com');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(mockedCreateBookingRequest).toHaveBeenCalledWith('camper-1', {
        name: 'Alice',
        email: 'alice@example.com',
      });
    });
    expect(await screen.findByRole('status')).toHaveTextContent(bookingResponse.message);
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });

  test('disables the submit button while the request is pending', async () => {
    const user = userEvent.setup();
    mockedCreateBookingRequest.mockImplementation(() => new Promise(() => undefined));
    renderWithProviders(<BookingForm camperId="camper-1" />);

    await user.type(screen.getByPlaceholderText('Name*'), 'Alice');
    await user.type(screen.getByPlaceholderText('Email*'), 'alice@example.com');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  test('shows a request error', async () => {
    const user = userEvent.setup();
    mockedCreateBookingRequest.mockRejectedValue(new Error('Failed'));
    renderWithProviders(<BookingForm camperId="camper-1" />);

    await user.type(screen.getByPlaceholderText('Name*'), 'Alice');
    await user.type(screen.getByPlaceholderText('Email*'), 'alice@example.com');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Failed to send booking request. Please try again.'
    );
  });
});
