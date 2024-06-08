import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

const isValidJob = (job) => {
  return (
    typeof job.id === 'number' &&
    typeof job.customerName === 'string' &&
    typeof job.jobType === 'string' &&
    typeof job.status === 'string' &&
    typeof job.appointmentDate === 'string' &&
    typeof job.technician === 'string'
  );
};

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}jobs`);
    const data = response.data;

    if (!Array.isArray(data) || !data.every(isValidJob)) {
      throw new Error('Invalid jobs data format');
    }

    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}jobs/${id}`);
    const data = response.data;

    if (!isValidJob(data)) {
      throw new Error(`Invalid job data format for job ID ${id}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching job by ID ${id}:`, error);
    throw error;
  }
};

// Similarly, update other functions to validate data format
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${BASE_URL}jobs`, jobData);
    const data = response.data;

    if (!isValidJob(data)) {
      throw new Error('Invalid job data format');
    }

    return data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${BASE_URL}jobs/${id}`, jobData);
    const data = response.data;

    if (!isValidJob(data)) {
      throw new Error(`Invalid job data format for job ID ${id}`);
    }

    return data;
  } catch (error) {
    console.error(`Error updating job ${id}:`, error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}jobs/${id}`);
    const data = response.data;

    if (!isValidJob(data)) {
      throw new Error(`Invalid job data format for job ID ${id}`);
    }

    return data;
  } catch (error) {
    console.error(`Error deleting job ${id}:`, error);
    throw error;
  }
};
