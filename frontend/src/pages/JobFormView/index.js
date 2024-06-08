import React from 'react';
import JobForm from '../../components/JobForm';
import useJobForm from '../../hooks/JobFormView/useJobForm';
import { useLocation } from 'react-router-dom';

const JobFormView = () => {
  const location = useLocation();
  const job = location.state?.job || null;
  const { handleSubmit } = useJobForm(job);

  return (
    <div className="job-view-container">
      <JobForm onSubmit={handleSubmit} job={job} />
    </div>
  );
};

export default JobFormView;
