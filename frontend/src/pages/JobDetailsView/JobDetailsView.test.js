import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import JobDetailsView from './index'

/**
 * @summary Tests for JobDetailsView component
 * @created by Jack Lee
 * @since 2024-06-07
 */

const job = {
  customerName: 'John Doe',
  jobType: 'Plumbing',
  status: 'Scheduled',
  appointmentDate: '2024-06-15T09:00:00Z',
  technician: 'Jane Smith',
}

const renderWithRouter = (ui, { route = '/', state = {} } = {}) => {
  window.history.pushState(state, 'Test page', route)

  return render(
    <MemoryRouter initialEntries={[{ pathname: route, state }]}>
      <Routes>
        <Route path="/jobdetails" element={ui} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('JobDetailsView', () => {
  test('renders job details correctly', () => {
    renderWithRouter(<JobDetailsView />, {
      route: '/jobdetails',
      state: { job },
    })

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    expect(screen.getByText(/Plumbing/i)).toBeInTheDocument()
    expect(screen.getByText(/Scheduled/i)).toBeInTheDocument()
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument()
  })

  test('displays "No job data found" when no job data is provided', () => {
    renderWithRouter(<JobDetailsView />, { route: '/jobdetails' })

    expect(screen.getByText(/No job data found/i)).toBeInTheDocument()
  })
})
