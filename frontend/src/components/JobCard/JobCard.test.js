import React from 'react';
import { render, screen } from '@testing-library/react';
import JobCard from './index';

const job = {
  customerName: "John Doe",
  jobType: "Plumbing",
  status: "Scheduled",
  appointmentDate: "2024-06-15T09:00:00Z",
  technician: "Jane Smith"
};

describe('JobCard Component', () => {
  test('renders job details correctly', () => {
    render(<JobCard job={job} />);

    expect(screen.getByText(/Customer: John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Job Type: Plumbing/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Scheduled/i)).toBeInTheDocument();
    expect(screen.getByText(/Appointment Date:/i)).toBeInTheDocument();
    expect(screen.getByText(/Technician: Jane Smith/i)).toBeInTheDocument();
  });

  test('renders image if imgSrc is provided', () => {
    const imgSrc = 'https://example.com/image.jpg';
    render(<JobCard job={job} imgSrc={imgSrc} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', imgSrc);
    expect(avatar).toHaveAttribute('alt', job.technician);
  });

  test('does not render image if imgSrc is not provided', () => {
    render(<JobCard job={job} />);

    const avatar = screen.queryByRole('img');
    expect(avatar).not.toBeInTheDocument();
  });
});
