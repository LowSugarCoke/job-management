import { useNavigate } from 'react-router-dom';

export const useJobNavigation = (jobs) => {
  const navigate = useNavigate();

  const handleNewJob = () => {
    navigate(`/jobform/create`);
  };

  const handleDoubleClick = (job) => {
    navigate(`/jobdetails`, { state: { job } });
  };

  const handleModifyJob = (jobId) => {
    const job = jobs.find((job) => job.id === jobId);
    if (job) {
      navigate(`/jobform/modify`, { state: { job } });
    }
  };

  return { handleNewJob, handleModifyJob, handleDoubleClick };
};
