import React from 'react'
import { CircularProgress, Box } from '@mui/material'

/**
 * @summary Displays a centered loading spinner
 * @created by Jack Lee
 * @since 2024-06-07
 */
const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      data-testid="loading-spinner"
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingComponent
