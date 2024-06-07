import React from 'react';
import PropTypes from 'prop-types';
import JobCard from '../../components/JobCard';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './JobDetailsView.css';

const job = {
  "id": 1,
  "customerName": "John Doe",
  "jobType": "Plumbing",
  "status": "Scheduled",
  "appointmentDate": "2024-06-15T09:00:00Z",
  "technician": "Jane Smith"
};

const avatarSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl6nKZ3eJ-C2aGe8bNe4KfMGXmCAU3USshMQ&s"

const JobDetailsView = () => {
    
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

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

JobDetailsView.propTypes = {
  job: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    appointmentDate: PropTypes.string.isRequired,
    technician: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobDetailsView;
