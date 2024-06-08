import { renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { useJobNavigation } from './useJobNavigation'

/**
 * @summary Tests for useNavigate hook
 * @created by Jack Lee
 * @since 2024-06-07
 */

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('useJobNavigation', () => {
  let navigate

  beforeEach(() => {
    navigate = jest.fn()
    useNavigate.mockImplementation(() => navigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('navigates to new job form on handleNewJob', () => {
    const { result } = renderHook(() => useJobNavigation([]))

    result.current.handleNewJob()

    expect(navigate).toHaveBeenCalledWith(`/jobform/create`)
  })

  test('navigates to job details on handleDoubleClick', () => {
    const job = { id: 1, title: 'Developer' }
    const { result } = renderHook(() => useJobNavigation([]))

    result.current.handleDoubleClick(job)

    expect(navigate).toHaveBeenCalledWith('/jobdetails', { state: { job } })
  })

  test('navigates to modify job form on handleModifyJob', () => {
    const jobs = [{ id: 1, title: 'Developer' }]
    const { result } = renderHook(() => useJobNavigation(jobs))

    result.current.handleModifyJob(1)

    expect(navigate).toHaveBeenCalledWith('/jobform/modify', {
      state: { job: jobs[0] },
    })
  })

  test('does not navigate to modify job form if jobId is not found', () => {
    const jobs = [{ id: 1, title: 'Developer' }]
    const { result } = renderHook(() => useJobNavigation(jobs))

    result.current.handleModifyJob(2)

    expect(navigate).not.toHaveBeenCalled()
  })
})
