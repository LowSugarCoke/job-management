import { useState } from 'react'

/**
 * @summary Custom hook to manage job selection state
 * @created by Jack Lee
 * @since 2024-06-07
 */
export const useJobSelection = () => {
  const [selectedJobs, setSelectedJobs] = useState([])

  const handleSelectJob = (id) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((j) => j !== id)
        : [...prevSelected, id],
    )
  }

  const resetSelectedJobs = () => {
    setSelectedJobs([])
  }

  return { selectedJobs, handleSelectJob, resetSelectedJobs }
}
