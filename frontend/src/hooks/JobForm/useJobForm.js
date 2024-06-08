import { useNavigate } from 'react-router-dom';
import { createJob, updateJob } from '../../services/api';

const useJobForm = (job = null) => {
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    try {
      if (job) {
        await updateJob(job.id, formValues);
      } else {
        await createJob(formValues);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting job form:', error);
    }
  };

  return { handleSubmit };
};

export default useJobForm;
