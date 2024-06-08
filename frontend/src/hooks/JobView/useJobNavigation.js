import { useNavigate } from 'react-router-dom';

export const useJobNavigation = () => {
  const navigate = useNavigate();

  const handleNewJob = () => {
    navigate(`/jobform`);
  };

  const handleDoubleClick = (job) => {
    navigate(`/jobdetails`, { state: { job } });
  };

  return { handleNewJob, handleDoubleClick };
};
