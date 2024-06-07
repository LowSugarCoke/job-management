import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { fetchJobs } from '../../services/api'

const JobTable = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchJobs()
        setJobs(data)
      } catch (error) {
        setError('Failed to fetch jobs.')
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

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
              <TableCell component="th" scope="row">
                {job.id}
              </TableCell>
              <TableCell>{job.customerName}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                {new Date(job.appointmentDate).toLocaleString()}
              </TableCell>
              <TableCell>{job.technician}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default JobTable
