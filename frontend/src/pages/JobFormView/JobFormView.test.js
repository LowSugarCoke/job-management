import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobFormView from './index';
import { useLocation } from 'react-router-dom';
import useJobForm from '../../hooks/JobFormView/useJobForm';
import JobForm from '../../components/JobForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../hooks/JobFormView/useJobForm');
jest.mock('../../components/JobForm');

describe('JobFormView', () => {
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useJobForm.mockReturnValue({
      handleSubmit: mockHandleSubmit,
    });

    JobForm.mockImplementation(({ onSubmit }) => (
      <form onSubmit={onSubmit}>
        <input type="text" name="customerName" aria-label="customerName" />
        <button type="submit">Submit</button>
      </form>
    ));
  });

  test('renders JobFormView correctly with job data', () => {
    const job = { customerName: 'John Doe', jobType: 'Repair' };
    useLocation.mockReturnValue({ state: { job } });

    render(<JobFormView />);

    expect(screen.getByRole('textbox', { name: /customerName/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('renders JobFormView correctly without job data', () => {
    useLocation.mockReturnValue({ state: null });

    render(<JobFormView />);

    expect(screen.getByRole('textbox', { name: /customerName/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('calls handleSubmit when form is submitted', () => {
    useLocation.mockReturnValue({ state: null });

    render(<JobFormView />);

    fireEvent.change(screen.getByRole('textbox', { name: /customerName/i }), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
