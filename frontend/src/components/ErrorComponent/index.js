import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

/**
 * @summary Displays a centered error message
 * @created by Jack Lee
 * @since 2024-06-07
 */
const ErrorComponent = ({ message }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography color="error">{message}</Typography>
    </Box>
  )
}

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorComponent
