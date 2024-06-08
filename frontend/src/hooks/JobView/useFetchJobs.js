import { useState, useEffect } from 'react'
import { fetchJobs as fetchJobsAPI } from '../../services/api'

/**
 * @summary Custom hook to fetch and manage job data from an API
 * @created by Jack Lee
 * @since 2024-06-07
 */
export const useFetchJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const data = await fetchJobsAPI()
      setJobs(data)
      setError(null)
      setIsFirstLoad(false) 
    } catch (error) {
      setError('Failed to fetch jobs')
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isFirstLoad) {
      fetchJobs()
    }
  }, [isFirstLoad])

  return { jobs, loading, error, fetchJobs }
}
