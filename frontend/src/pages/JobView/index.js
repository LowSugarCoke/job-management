import React from 'react'
import JobTable from '../../components/JobTable'
import { useFetchJobs } from '../../hooks/JobView/useFetchJobs'
import { useJobSelection } from '../../hooks/JobView/useJobSelection'
import { useJobNavigation } from '../../hooks/JobView/useJobNavigation'
import { useJobDeletion } from '../../hooks/JobView/useJobDeletion'
import { Button } from '@mui/material'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorComponent from '../../components/ErrorComponent'
import './JobView.css'

/**
 * @summary Displays a list of jobs with options to create, modify, and delete jobs
 * @created by Jack Lee
 * @since 2024-06-07
 */
const JobView = () => {
  const { jobs, loading, error, fetchJobs } = useFetchJobs()
  const { selectedJobs, handleSelectJob, resetSelectedJobs } = useJobSelection()
  const { handleNewJob, handleModifyJob, handleDoubleClick } =
    useJobNavigation(jobs)
  const { handleDeleteJobs, deleting, deleteError } = useJobDeletion(
    fetchJobs,
    resetSelectedJobs,
  )

  if (loading) return <LoadingSpinner />
  if (error || deleteError)
    return <ErrorComponent message={error || deleteError} />

  return (
    <>
      <div className="job-view-container">
        <div className="job-view-row">
          <div className="job-view-button-container">
            <Button variant="contained" color="primary" onClick={handleNewJob}>
              New
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedJobs.length !== 1}
              onClick={() => handleModifyJob(selectedJobs[0])}
            >
              Modify
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedJobs.length === 0 || deleting}
              onClick={() => handleDeleteJobs(selectedJobs)}
            >
              Delete
            </Button>
          </div>
          <JobTable
            jobs={jobs}
            onSelectJob={handleSelectJob}
            onDoubleClick={handleDoubleClick}
            selectedJobs={selectedJobs}
          />
        </div>
      </div>
    </>
  )
}

export default JobView
