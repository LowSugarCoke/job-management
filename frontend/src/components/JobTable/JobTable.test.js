import React from 'react'
import { render, screen } from '@testing-library/react'
import JobTable from '.'
import { fetchJobs } from '../../services/api'

/**
 * @summary Tests for JobTable component
 * @created by Jack Lee
 * @since 2024-06-07
 */

jest.mock('../../services/api')

describe('JobTable component', () => {
  test('renders table headers correctly', async () => {
    fetchJobs.mockResolvedValue([
      {
        id: 1,
        customerName: 'John Doe',
        jobType: 'Full-time',
        status: 'Pending',
        appointmentDate: '2024-06-07T12:00:00Z',
        technician: 'Jane Smith',
      },
    ])
    const mockOnSelectJob = jest.fn()
    const jobs = await fetchJobs()
    render(<JobTable jobs={jobs} onSelectJob={mockOnSelectJob} />)

    expect(screen.getByText(/ID/i)).toBeInTheDocument()
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Job Type/i)).toBeInTheDocument()
    expect(screen.getByText(/Status/i)).toBeInTheDocument()
    expect(screen.getByText(/Appointment Date/i)).toBeInTheDocument()
    expect(screen.getByText(/Technician/i)).toBeInTheDocument()
  })
})
