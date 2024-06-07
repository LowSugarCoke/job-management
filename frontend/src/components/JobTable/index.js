import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
} from '@mui/material';

const JobTable = ({ jobs, className, onSelectJob }) => {
  return (
    <TableContainer component={Paper} className={className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Job Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Technician</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} >
              <TableCell padding="checkbox">
                <Checkbox onClick={() => onSelectJob(job.id)}/>
              </TableCell>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.customerName}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{new Date(job.appointmentDate).toLocaleString()}</TableCell>
              <TableCell>{job.technician}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

JobTable.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      jobType: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      appointmentDate: PropTypes.string.isRequired,
      technician: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  onSelectJob: PropTypes.func.isRequired,
};

export default JobTable;