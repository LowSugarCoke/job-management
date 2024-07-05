import React from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './JobForm.css'

const validationSchema = yup.object().shape({
  customerName: yup.string().required('Customer name is required'),
  jobType: yup.string().required('Job type is required'),
  status: yup.string().required('Status is required'),
  appointmentDate: yup.date().required('Appointment date is required').nullable(),
  technician: yup.string().required('Technician is required'),
})

/**
 * @summary Renders a job form with fields for customer name, job type, status, appointment date, and technician.
 * It includes validation and submission handling.
 * @created by Jack Lee
 * @since 2024-06-07
 */

const JobForm = ({ job, onSubmit, className }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: job || {
      customerName: '',
      jobType: '',
      status: '',
      appointmentDate: null,
      technician: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const onFormSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <Container className={className}>
      <Typography variant="h4" gutterBottom>
        Job Form
      </Typography>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              id="customerName"
              {...register('customerName')}
              error={!!errors.customerName}
              helperText={errors.customerName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Type"
              id="jobType"
              {...register('jobType')}
              error={!!errors.jobType}
              helperText={errors.jobType?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                {...register('status')}
                defaultValue=""
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
              <Typography variant="body2" color="error">
                {errors.status?.message}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Appointment Date (Local time):
            </Typography>
            <DatePicker
              selected={job?.appointmentDate}
              onChange={(date) => setValue('appointmentDate', date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              timeCaption="Time"
              className="form-control"
              wrapperClassName="date-picker"
              placeholderText="Select appointment date and time"
            />
            <Typography variant="body2" color="error">
              {errors.appointmentDate?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Technician"
              id="technician"
              {...register('technician')}
              error={!!errors.technician}
              helperText={errors.technician?.message}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

JobForm.propTypes = {
  job: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default JobForm
