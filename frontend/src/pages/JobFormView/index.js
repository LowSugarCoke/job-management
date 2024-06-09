import React from 'react'
import JobForm from '../../components/JobForm'
import useJobForm from '../../hooks/JobFormView/useJobForm'
import { useLocation } from 'react-router-dom'

/**
 * @summary Displays a job form for creating or editing a job
 * @created by Jack Lee
 * @since 2024-06-07
 */
const JobFormView = () => {
  const location = useLocation()
  const job = location.state?.job || null
  const { handleSubmit } = useJobForm(job)

  return (
    <div>
      <JobForm onSubmit={handleSubmit} job={job} />
    </div>
  )
}

export default JobFormView
