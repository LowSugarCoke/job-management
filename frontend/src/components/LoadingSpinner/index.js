import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingComponent = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" data-testid="loading-spinner">
      <CircularProgress />
    </Box>
  );
};

export default LoadingComponent;