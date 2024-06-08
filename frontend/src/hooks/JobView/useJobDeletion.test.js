import { renderHook, act } from '@testing-library/react';
import { useJobDeletion } from './useJobDeletion';
import { deleteJob } from '../../services/api';

jest.mock('../../services/api', () => ({
  deleteJob: jest.fn(),
}));

describe('useJobDeletion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deletes selected jobs successfully', async () => {
    const mockFetchJobs = jest.fn();
    const mockResetSelectedJobs = jest.fn();
    deleteJob.mockResolvedValue({});
    const selectedJobs = [1, 2];
    window.confirm = jest.fn().mockReturnValue(true); 

    const { result } = renderHook(() => useJobDeletion(mockFetchJobs, mockResetSelectedJobs));

    await act(async () => {
      await result.current.handleDeleteJobs(selectedJobs);
    });

    expect(deleteJob).toHaveBeenCalledTimes(selectedJobs.length);
    expect(deleteJob).toHaveBeenCalledWith(1);
    expect(deleteJob).toHaveBeenCalledWith(2);
    expect(mockFetchJobs).toHaveBeenCalled();
    expect(mockResetSelectedJobs).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
    expect(result.current.deleting).toBeFalsy();
  });

  test('handles cancellation of job deletion', async () => {
    const mockFetchJobs = jest.fn();
    const mockResetSelectedJobs = jest.fn();
    window.confirm = jest.fn().mockReturnValue(false); 

    const { result } = renderHook(() => useJobDeletion(mockFetchJobs, mockResetSelectedJobs));
    const selectedJobs = [1, 2];

    await act(async () => {
      await result.current.handleDeleteJobs(selectedJobs);
    });

    expect(deleteJob).not.toHaveBeenCalled();
    expect(mockFetchJobs).not.toHaveBeenCalled();
    expect(mockResetSelectedJobs).not.toHaveBeenCalled();
    expect(result.current.error).toBeNull();
    expect(result.current.deleting).toBeFalsy();
  });

  test('handles errors during job deletion', async () => {
    const errorMessage = 'Error deleting jobs';
    const mockFetchJobs = jest.fn();
    const mockResetSelectedJobs = jest.fn();
    deleteJob.mockRejectedValue(new Error(errorMessage));
    window.confirm = jest.fn().mockReturnValue(true); 

    const { result } = renderHook(() => useJobDeletion(mockFetchJobs, mockResetSelectedJobs));
    const selectedJobs = [1, 2];

    await act(async () => {
      await result.current.handleDeleteJobs(selectedJobs);
    });

    expect(deleteJob).toHaveBeenCalledTimes(selectedJobs.length);
    expect(mockFetchJobs).not.toHaveBeenCalled();
    expect(mockResetSelectedJobs).not.toHaveBeenCalled();
    expect(result.current.error).toEqual(new Error(errorMessage));
    expect(result.current.deleting).toBeFalsy();
  });
});
