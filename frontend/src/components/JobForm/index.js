import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './JobForm.css';
import useJobForm from '../../hooks/JobForm/useJobForm';

const JobForm = ({ job, onSubmit }) => {
  const { formValues, handleInputChange, handleDateChange, validateForm, handleBack } = useJobForm(job);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
    } else {
      setFormError('Please fill out all fields.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Job Form
      </Typography>
      {formError && <Typography variant="body1" color="error">{formError}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={formValues.customerName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Type"
              name="jobType"
              value={formValues.jobType}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formValues.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Appointment Date (Local time):</Typography>
            <DatePicker
              selected={formValues.appointmentDate}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss"
              timeCaption="Time"
              className="form-control"
              wrapperClassName="date-picker"
              placeholderText="Select appointment date and time"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Technician"
              name="technician"
              value={formValues.technician}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

JobForm.propTypes = {
  job: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default JobForm;
