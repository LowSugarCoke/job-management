import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}jobs`)
    return response.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
    throw error
  }
}

export const fetchJobById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}jobs/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching job by ID ${id}:`, error)
    throw error
  }
}

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${BASE_URL}jobs`, jobData)
    return response.data
  } catch (error) {
    console.error('Error creating job:', error)
    throw error
  }
}

export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${BASE_URL}jobs/${id}`, jobData)
    return response.data
  } catch (error) {
    console.error(`Error updating job ${id}:`, error)
    throw error
  }
}

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}jobs/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting job ${id}:`, error)
    throw error
  }
}
