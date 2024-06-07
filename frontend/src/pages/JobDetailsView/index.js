import React from 'react';
import JobCard from '../../components/JobCard';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './JobDetailsView.css';

const avatarSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl6nKZ3eJ-C2aGe8bNe4KfMGXmCAU3USshMQ&s"

const JobDetailsView = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { job } = location.state || {}; 

  const handleBack = () => {
    navigate(-1);
  };

  if (!job) {
    return <div>No job data found</div>;
  }

  return (
    <div className="job-details-container">
      <div className='job-details-row'>
        <JobCard className={"job-card"} job={job} imgSrc={avatarSrc} />
        <Button className="btn-back"variant="contained" color="primary" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsView;
