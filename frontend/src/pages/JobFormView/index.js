import React from 'react';
import JobForm from '../../components/JobForm';
import useJobForm from '../../hooks/JobForm/useJobForm';

const JobFormView = () => {
  const { handleSubmit } = useJobForm();

  return (
    <div className="job-view-container">
      <JobForm onSubmit={handleSubmit} />
    </div>
  );
};

export default JobFormView;
