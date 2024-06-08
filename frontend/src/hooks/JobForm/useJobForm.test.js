import { renderHook, act } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import useJobForm from './useJobForm'

/**
 * @summary Tests for useJobForm hook
 * @created by Jack Lee
 * @since 2024-06-07
 */

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('useJobForm hook', () => {
  test('initializes the form with default values', () => {
    const initialJob = {
      customerName: '',
      jobType: '',
      status: '',
      appointmentDate: null,
      technician: '',
    }
    const { result } = renderHook(() => useJobForm())

    expect(result.current.formValues).toEqual(initialJob)
  })

  test('handles input changes', () => {
    const { result } = renderHook(() => useJobForm())
    const newName = 'John Doe'

    act(() => {
      result.current.handleInputChange({
        target: { name: 'customerName', value: newName },
      })
    })

    expect(result.current.formValues.customerName).toBe(newName)
  })

  test('navigates back on handleBack', () => {
    const navigate = jest.fn()
    useNavigate.mockImplementation(() => navigate)
    const { result } = renderHook(() => useJobForm())

    act(() => {
      result.current.handleBack()
    })

    expect(navigate).toHaveBeenCalledWith(-1)
  })
})
