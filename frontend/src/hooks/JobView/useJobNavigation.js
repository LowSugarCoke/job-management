import { useNavigate } from 'react-router-dom'

/**
 * @summary Custom hook to handle job navigation logic, including creating, modifying, and viewing job details
 * @created by Jack Lee
 * @since 2024-06-07
 */
export const useJobNavigation = (jobs) => {
  const navigate = useNavigate()

  const handleNewJob = () => {
    navigate(`/jobform/create`)
  }

  const handleDoubleClick = (job) => {
    navigate(`/jobdetails`, { state: { job } })
  }

  const handleModifyJob = (jobId) => {
    const job = jobs.find((job) => job.id === jobId)
    if (job) {
      navigate(`/jobform/modify`, { state: { job } })
    }
  }

  return { handleNewJob, handleModifyJob, handleDoubleClick }
}
