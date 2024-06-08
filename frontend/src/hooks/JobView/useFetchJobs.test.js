import { renderHook } from '@testing-library/react';
import { useFetchJobs } from './useFetchJobs';
import { fetchJobs as fetchJobsAPI } from '../../services/api';
import { waitFor } from '@testing-library/react';

jest.mock('../../services/api', () => ({
    fetchJobs: jest.fn(),
  }));
  
  describe('useFetchJobs', () => {
    test('fetches jobs successfully and updates state', async () => {
      const mockJobsData = [{ id: 1, title: 'Software Engineer' }];
      fetchJobsAPI.mockResolvedValue(mockJobsData);
  
      const { result } = renderHook(() => useFetchJobs());
  
      expect(result.current.jobs).toEqual([]);
      expect(result.current.loading).toBeTruthy();
      expect(result.current.error).toBeNull();
  
      await waitFor(() => expect(result.current.loading).toBeFalsy());
  
      expect(result.current.jobs).toEqual(mockJobsData);
      expect(result.current.error).toBeNull();
    });
  
    test('handles errors when fetching jobs', async () => {
      const errorMessage = 'Failed to fetch jobs';
      fetchJobsAPI.mockRejectedValue(new Error('Network error'));
  
      const { result } = renderHook(() => useFetchJobs());
  
      expect(result.current.jobs).toEqual([]);
      expect(result.current.loading).toBeTruthy();
      expect(result.current.error).toBeNull();
  
      await waitFor(() => expect(result.current.loading).toBeFalsy());
  
      expect(result.current.jobs).toEqual([]);
      expect(result.current.error).toEqual(errorMessage);
    });
  });