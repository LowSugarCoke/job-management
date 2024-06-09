import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import JobView from './pages/JobView'
import JobDetailsView from './pages/JobDetailsView'
import JobFormView from './pages/JobFormView'
import HomeView from './pages/HomeView'

/**
 * @summary Main router component for job management application
 * @created by Jack Lee
 * @since 2024-06-07
 */

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/jobview" element={<JobView />} />
      <Route path="/jobdetails" element={<JobDetailsView />} />
      <Route path="/jobform/create" element={<JobFormView action="create" />} />
      <Route path="/jobform/modify" element={<JobFormView action="modify" />} />
    </Routes>
  </BrowserRouter>
)

export default Router
