import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobView from './pages/JobView';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<JobView />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
