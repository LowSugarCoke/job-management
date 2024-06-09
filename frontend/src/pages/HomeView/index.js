import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import './HomeView.css'

/**
 * @summary Displays the home view with a button to navigate to the job view
 * @created by Jack Lee
 * @since 2024-06-08
 */
const HomeView = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/jobview')
  }

  return (
    <div className="home-view">
      <div className="btn-container">
        <Typography
          variant="h3"
          component="h1"
          style={{ fontWeight: 'bold', marginBottom: '20px' }}
        >
          Job Management
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: green[400],
            color: 'white',
            height: '60px',
            fontSize: '20px',
          }}
          onClick={handleButtonClick}
        >
          Go to Job View
        </Button>
      </div>
    </div>
  )
}

export default HomeView
