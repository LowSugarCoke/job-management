import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JobForm from './index';

describe('JobForm Component', () => {
  test('renders JobForm component correctly', () => {
    render(<JobForm onSubmit={jest.fn()} />);
    expect(screen.getByText('Job Form')).toBeInTheDocument();
    expect(screen.getByLabelText('Customer Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Type')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Appointment Date (Local time):')).toBeInTheDocument();
    expect(screen.getByLabelText('Technician')).toBeInTheDocument();
  });

  test('allows user to enter text in input fields', () => {
    render(<JobForm onSubmit={jest.fn()} />);
    const customerNameInput = screen.getByLabelText('Customer Name');
    const jobTypeInput = screen.getByLabelText('Job Type');
    const technicianInput = screen.getByLabelText('Technician');

    userEvent.type(customerNameInput, 'John Doe');
    userEvent.type(jobTypeInput, 'Repair');
    userEvent.type(technicianInput, 'Tech A');

    expect(customerNameInput.value).toBe('John Doe');
    expect(jobTypeInput.value).toBe('Repair');
    expect(technicianInput.value).toBe('Tech A');
  });

test('submits form with correct values', async () => {
  const mockOnSubmit = jest.fn();
  render(<JobForm onSubmit={mockOnSubmit} job={{
    customerName: 'John Doe',
    jobType: 'Repair',
    status: 'Scheduled',
    appointmentDate: new Date('2024-07-10T10:00:00'),
    technician: 'Tech A'
  }} />);

  const statusDropdown = screen.getByRole('combobox', { name: /status/i });
  userEvent.click(statusDropdown);

  const scheduledOption = await screen.findByRole('option', { name: 'Scheduled' });
  userEvent.click(scheduledOption);

  const submitButton = screen.getByRole('button', { name: 'Submit' });
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledWith({
      customerName: 'John Doe',
      jobType: 'Repair',
      status: 'Scheduled',
      appointmentDate: new Date('2024-07-10T10:00:00'),
      technician: 'Tech A'
    });
  });
});


test('displays error messages for required fields', async () => {
  render(<JobForm onSubmit={jest.fn()} />);
  const submitButton = screen.getByText('Submit');

  userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Customer name is required')).toBeInTheDocument();
    expect(screen.getByText('Job type is required')).toBeInTheDocument();
    expect(screen.getByText('Status is required')).toBeInTheDocument();
    expect(screen.getByText('Technician is required')).toBeInTheDocument();
    });
  });
});
