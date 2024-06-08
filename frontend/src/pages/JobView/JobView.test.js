import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobView from './index';
import { useFetchJobs } from '../../hooks/JobView/useFetchJobs';
import { useJobSelection } from '../../hooks/JobView/useJobSelection';
import { useJobNavigation } from '../../hooks/JobView/useJobNavigation';
import { useJobDeletion } from '../../hooks/JobView/useJobDeletion';

jest.mock('../../hooks/JobView/useFetchJobs');
jest.mock('../../hooks/JobView/useJobSelection');
jest.mock('../../hooks/JobView/useJobNavigation');
jest.mock('../../hooks/JobView/useJobDeletion');

const mockFetchJobs = jest.fn();
const mockHandleSelectJob = jest.fn();
const mockResetSelectedJobs = jest.fn();
const mockHandleNewJob = jest.fn();
const mockHandleModifyJob = jest.fn();
const mockHandleDoubleClick = jest.fn();
const mockHandleDeleteJobs = jest.fn();

describe('JobView', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useFetchJobs.mockReturnValue({
      jobs: [],
      loading: false,
      error: null,
      fetchJobs: mockFetchJobs,
    });

    useJobSelection.mockReturnValue({
      selectedJobs: [],
      handleSelectJob: mockHandleSelectJob,
      resetSelectedJobs: mockResetSelectedJobs,
    });

    useJobNavigation.mockReturnValue({
      handleNewJob: mockHandleNewJob,
      handleModifyJob: mockHandleModifyJob,
      handleDoubleClick: mockHandleDoubleClick,
    });

    useJobDeletion.mockReturnValue({
      handleDeleteJobs: mockHandleDeleteJobs,
      deleting: false,
      deleteError: null,
    });
  });

  test('renders JobView correctly', () => {
    render(<JobView />);

    expect(screen.getByText(/new/i)).toBeInTheDocument();
    expect(screen.getByText(/modify/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
  });

  test('calls handleNewJob when New button is clicked', () => {
    render(<JobView />);

    const newButton = screen.getByText(/new/i);
    fireEvent.click(newButton);

    expect(mockHandleNewJob).toHaveBeenCalledTimes(1);
  });

  test('calls handleModifyJob when Modify button is clicked', () => {
    useJobSelection.mockReturnValueOnce({
      selectedJobs: ['1'],
      handleSelectJob: mockHandleSelectJob,
      resetSelectedJobs: mockResetSelectedJobs,
    });

    render(<JobView />);

    const modifyButton = screen.getByText(/modify/i);
    fireEvent.click(modifyButton);

    expect(mockHandleModifyJob).toHaveBeenCalledWith('1');
  });

  test('calls handleDeleteJobs when Delete button is clicked', () => {
    useJobSelection.mockReturnValueOnce({
      selectedJobs: ['1', '2'],
      handleSelectJob: mockHandleSelectJob,
      resetSelectedJobs: mockResetSelectedJobs,
    });

    render(<JobView />);

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    expect(mockHandleDeleteJobs).toHaveBeenCalledWith(['1', '2']);
  });

  test('disables Modify button when no job is selected', () => {
    render(<JobView />);

    const modifyButton = screen.getByText(/modify/i);
    expect(modifyButton).toBeDisabled();
  });

  test('disables Delete button when no job is selected', () => {
    render(<JobView />);

    const deleteButton = screen.getByText(/delete/i);
    expect(deleteButton).toBeDisabled();
  });

  test('disables Delete button when deleting is in progress', () => {
    useJobDeletion.mockReturnValueOnce({
      handleDeleteJobs: mockHandleDeleteJobs,
      deleting: true,
      deleteError: null,
    });

    render(<JobView />);

    const deleteButton = screen.getByText(/delete/i);
    expect(deleteButton).toBeDisabled();
  });

  test('renders loading spinner when loading is true', () => {
    useFetchJobs.mockReturnValueOnce({
      jobs: [],
      loading: true,
      error: null,
      fetchJobs: mockFetchJobs,
    });

    render(<JobView />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders error component when error occurs', () => {
    useFetchJobs.mockReturnValueOnce({
      jobs: [],
      loading: false,
      error: 'Error fetching jobs',
      fetchJobs: mockFetchJobs,
    });

    render(<JobView />);

    expect(screen.getByText(/error fetching jobs/i)).toBeInTheDocument();
  });
});
