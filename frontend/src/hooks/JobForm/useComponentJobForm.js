import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useComponentJobForm = (initialJob) => {
  const [formValues, setFormValues] = useState(initialJob || {
    customerName: '',
    jobType: '',
    status: '',
    appointmentDate: null,
    technician: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setFormValues({
      ...formValues,
      appointmentDate: date
    });
  };

  const validateForm = () => {
    return Object.values(formValues).every(value => value !== null && value !== '');
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return {
    formValues,
    handleInputChange,
    handleDateChange,
    validateForm,
    handleBack
  };
};

export default useComponentJobForm;
