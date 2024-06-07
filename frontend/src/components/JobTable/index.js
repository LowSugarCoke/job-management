import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const JobTable = () => {
    const [jobs] = useState([
        {
            id: 1,
            customerName: "John Doe",
            jobType: "Plumbing",
            status: "Scheduled",
            appointmentDate: "2024-06-15T09:00:00Z",
            technician: "Jane Smith"
        },
        {
            id: 2,
            customerName: "Alice Johnson",
            jobType: "Electrical",
            status: "Completed",
            appointmentDate: "2024-05-20T14:00:00Z",
            technician: "Bob Brown"
        },
        {
            id: 3,
            customerName: "Carlos Ray",
            jobType: "HVAC",
            status: "In Progress",
            appointmentDate: "2024-06-07T12:00:00Z",
            technician: "Sam White"
        }
    ]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
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
                        <TableRow key={job.id}>
                            <TableCell component="th" scope="row">{job.id}</TableCell>
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

export default JobTable;
