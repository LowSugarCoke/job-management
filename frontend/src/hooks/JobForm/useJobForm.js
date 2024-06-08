import { useNavigate } from 'react-router-dom';
import { createJob } from '../../services/api';  

const useJobForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    try {
      await createJob(formValues);
      navigate('/');  
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return { handleSubmit };
};

export default useJobForm;
