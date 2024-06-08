import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobView from './pages/JobView';
import JobDetailsView from './pages/JobDetailsView';
import JobFormView from './pages/JobFormView';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<JobView />} />
      <Route path="/jobdetails" element={<JobDetailsView />} />
      <Route path="/jobform" element={<JobFormView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
