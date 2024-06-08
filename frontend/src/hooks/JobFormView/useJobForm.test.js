import { renderHook, act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import useJobForm from './useJobForm';
import { createJob, updateJob } from '../../services/api';

jest.mock('../../services/api', () => ({
  createJob: jest.fn(),
  updateJob: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useJobForm', () => {
  test('creates a new job if no job is passed', async () => {
    const formValues = { title: 'New Job' };
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    createJob.mockResolvedValue({});

    const { result } = renderHook(() => useJobForm());

    await act(async () => {
      await result.current.handleSubmit(formValues);
    });

    expect(createJob).toHaveBeenCalledWith(formValues);
    expect(updateJob).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('updates an existing job if a job is passed', async () => {
    const job = { id: 1, title: 'Existing Job' };
    const formValues = { title: 'Updated Job Title' };
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    updateJob.mockResolvedValue({});

    const { result } = renderHook(() => useJobForm(job));

    await act(async () => {
      await result.current.handleSubmit(formValues);
    });

    expect(updateJob).toHaveBeenCalledWith(job.id, formValues);
    expect(createJob).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });

  test('handles exceptions and logs errors', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Failed to submit');
    createJob.mockRejectedValue(error);
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    const { result } = renderHook(() => useJobForm());

    await act(async () => {
      await result.current.handleSubmit({});
    });

    expect(console.error).toHaveBeenCalledWith('Error submitting job form:', error);
    expect(navigate).not.toHaveBeenCalled(); // Checks that it doesn't navigate on error
    consoleErrorMock.mockRestore();
  });
});
