import { useState } from 'react'
import { deleteJob } from '../../services/api'

/**
 * @summary Custom hook to handle job deletion logic with confirmation and error handling
 * @created by Jack Lee
 * @since 2024-06-07
 */
export const useJobDeletion = (fetchJobs, resetSelectedJobs) => {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  const handleDeleteJobs = async (selectedJobs) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedJobs.length} jobs?`,
    )
    if (!confirmDelete) return

    setDeleting(true)
    setError(null)
    try {
      await Promise.all(selectedJobs.map((id) => deleteJob(id)))
      fetchJobs()
      resetSelectedJobs()
    } catch (error) {
      console.error('Error deleting jobs:', error)
      setError(error)
    } finally {
      setDeleting(false)
    }
  }

  return { handleDeleteJobs, deleting, error }
}
