import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobView from './pages/JobView';
import JobDetailsView from './pages/JobDetailsView';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<JobView />} />
      <Route path="/jobdetails" element={<JobDetailsView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
