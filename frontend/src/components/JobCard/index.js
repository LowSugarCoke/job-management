import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material'

/**
 * @summary Displays job details in a card format
 * @created by Jack Lee
 * @since 2024-06-07
 */
const JobCard = ({ job, className, imgSrc }) => {
  return (
    <Card sx={{ boxShadow: 5 }} className={className}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <Typography variant="body2" sx={{ fontSize: '1.5rem' }}>
              Customer: {job.customerName}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.5rem' }}>
              Job Type: {job.jobType}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.5rem' }}>
              Status: {job.status}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.5rem' }}>
              Appointment Date: {new Date(job.appointmentDate).toUTCString()}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1.5rem' }}>
              Technician: {job.technician}
            </Typography>
          </Grid>
          {imgSrc && (
            <Grid item xs={3} container justifyContent="center">
              <Avatar
                alt={job.technician}
                src={imgSrc}
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

JobCard.propTypes = {
  job: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    appointmentDate: PropTypes.string.isRequired,
    technician: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  imgSrc: PropTypes.string,
}

export default JobCard
