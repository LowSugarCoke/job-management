import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import JobForm from "./index";

jest.mock('../../hooks/JobForm/useJobForm', () => ({
    __esModule: true,
    default: () => ({
        formValues: {
            customerName: '',
            jobType: '',
            status: '',
            appointmentDate: null,
            technician: ''
        },
        handleInputChange: jest.fn(event => ({
            ...event.target,
            value: event.target.value
        })),
        handleDateChange: jest.fn(),
        validateForm: jest.fn().mockReturnValue(true),
        handleBack: jest.fn()
    })
}));

describe('JobForm', () => {
    const mockSubmit = jest.fn();
    
    test('renders correctly', () => {
      render(<JobForm job={{}} onSubmit={mockSubmit} />);
      expect(screen.getByText('Job Form')).toBeInTheDocument();
      expect(screen.getByLabelText('Customer Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Job Type')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Appointment Date (Local time):')).toBeInTheDocument();
      expect(screen.getByLabelText('Technician')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
  
    test('submits the form when all fields are filled and valid', () => {
      render(<JobForm job={{}} onSubmit={mockSubmit} />);
      fireEvent.change(screen.getByLabelText('Customer Name'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText('Job Type'), { target: { value: 'Repair' } });
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
      expect(mockSubmit).toHaveBeenCalled();
    });

  });
  