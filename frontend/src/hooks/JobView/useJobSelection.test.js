import { renderHook, act } from '@testing-library/react';
import { useJobSelection } from './useJobSelection';

describe('useJobSelection', () => {
  test('selects and deselects a job', () => {
    const { result } = renderHook(() => useJobSelection());

    act(() => {
      result.current.handleSelectJob(1);
    });
    expect(result.current.selectedJobs).toContain(1);

    act(() => {
      result.current.handleSelectJob(1);
    });
    expect(result.current.selectedJobs).not.toContain(1);
  });

  test('resets selected jobs', () => {
    const { result } = renderHook(() => useJobSelection());

    act(() => {
      result.current.handleSelectJob(1);
      result.current.handleSelectJob(2);
    });
    expect(result.current.selectedJobs).toEqual([1, 2]);

    act(() => {
      result.current.resetSelectedJobs();
    });
    expect(result.current.selectedJobs).toEqual([]);
  });
});
