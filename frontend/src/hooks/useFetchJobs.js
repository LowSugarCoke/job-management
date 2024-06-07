import { useState, useEffect } from 'react';
import { fetchJobs } from '../services/api';  

export const useFetchJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs();
        setJobs(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch jobs');
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return { jobs, loading, error };
};
