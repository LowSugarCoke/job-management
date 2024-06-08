import React from 'react';
import JobTable from '../../components/JobTable';
import { useFetchJobs } from '../../hooks/JobView/useFetchJobs';
import { useJobSelection } from '../../hooks/JobView/useJobSelection';
import { useJobNavigation } from '../../hooks/JobView/useJobNavigation';
import { useJobDeletion } from '../../hooks/JobView/useJobDeletion';
import { CircularProgress, Box, Button } from '@mui/material';
import './JobView.css';

const JobView = () => {
  const { jobs, loading, error, fetchJobs } = useFetchJobs();
  const { selectedJobs, handleSelectJob, resetSelectedJobs } = useJobSelection();
  const { handleNewJob, handleDoubleClick } = useJobNavigation();
  const { handleDeleteJobs, deleting, deleteError } = useJobDeletion(fetchJobs, resetSelectedJobs);

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error || deleteError) return <p>{error || deleteError}</p>;

  return (
    <>
      <div className="job-view-container">
        <div className="job-view-row">
          <div className="job-view-button-container">
            <Button variant="contained" color="primary" onClick={handleNewJob}>New</Button>
            <Button variant="contained" color="primary" disabled={selectedJobs.length !== 1}>Modify</Button>
            <Button 
              variant="contained" 
              color="primary" 
              disabled={selectedJobs.length === 0 || deleting} 
              onClick={() => handleDeleteJobs(selectedJobs)}
            >
              Delete
            </Button>
          </div>
          <JobTable jobs={jobs} onSelectJob={handleSelectJob} onDoubleClick={handleDoubleClick} selectedJobs={selectedJobs}/>
        </div>
      </div>
    </>
  );
};

export default JobView;
