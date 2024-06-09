import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import HomeView from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('HomeView', () => {
  test('renders Job Management heading', () => {
    render(
      <BrowserRouter>
        <HomeView />
      </BrowserRouter>,
    )

    const heading = screen.getByRole('heading', { name: /Job Management/i })
    expect(heading).toBeInTheDocument()
  })

  test('renders Go to Job View button', () => {
    render(
      <BrowserRouter>
        <HomeView />
      </BrowserRouter>,
    )

    const button = screen.getByRole('button', { name: /Go to Job View/i })
    expect(button).toBeInTheDocument()
  })

  test('navigates to /jobview when button is clicked', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    render(
      <BrowserRouter>
        <HomeView />
      </BrowserRouter>,
    )

    const button = screen.getByRole('button', { name: /Go to Job View/i })
    userEvent.click(button)

    expect(navigate).toHaveBeenCalledWith('/jobview')
  })
})
