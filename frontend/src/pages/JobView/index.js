import React, { useState } from 'react';
import JobTable from '../../components/JobTable';
import { useFetchJobs } from '../../hooks/useFetchJobs';
import { CircularProgress, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './JobView.css';

const JobView = () => {
  const navigate = useNavigate();
  const { jobs, loading, error } = useFetchJobs();
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleSelectJob = (id) => {
    setSelectedJobs((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((j) => j !== id) : [...prevSelected, id]
    );
  };

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <p>{error}</p>;

  const handleDoubleClick = (job) => {
    navigate(`/jobdetails`, { state: { job } });
  };

  return (
    <>
        <div className="job-view-container">
            <div className="job-view-row">
                <div className="job-view-button-container">
                <Button variant="contained" color="primary">New</Button>
                <Button variant="contained" color="primary" disabled={selectedJobs.length === 0}>Modify</Button>
                <Button variant="contained" color="primary" disabled={selectedJobs.length === 0}>Delete</Button>
                </div>
                <JobTable jobs={jobs} onSelectJob={handleSelectJob} onDoubleClick={handleDoubleClick}/>
            </div>
        </div>
    </>
  );
};

export default JobView;
