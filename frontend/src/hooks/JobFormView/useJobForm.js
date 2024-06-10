import { useNavigate } from 'react-router-dom'
import { createJob, updateJob } from '../../services/api'

/**
 * @summary Custom hook to handle job form submission logic
 * @created by Jack Lee
 * @since 2024-06-07
 */
const useJobForm = (job = null) => {
  const navigate = useNavigate()

  const handleSubmit = async (formValues) => {
    try {
      if (job) {
        await updateJob(job.id, formValues)
      } else {
        await createJob(formValues)
      }
      navigate('/jobview')
    } catch (error) {
      console.error('Error submitting job form:', error)
    }
  }

  return { handleSubmit }
}

export default useJobForm
