import React from 'react';
import { render, screen } from '@testing-library/react';
import JobTable from '.';
import { fetchJobs } from '../../services/api';

jest.mock('../../services/api');

describe('JobTable component', () => {
    test('renders table headers correctly', async () => {
        fetchJobs.mockResolvedValue([
            { id: 1, customerName: 'John Doe', jobType: 'Full-time', status: 'Pending', appointmentDate: '2024-06-07T12:00:00Z', technician: 'Jane Smith' },
        ]);

        render(<JobTable />);

        expect(await screen.findByText(/ID/i)).toBeInTheDocument();
        expect(await screen.findByText(/Customer Name/i)).toBeInTheDocument();
        expect(await screen.findByText(/Job Type/i)).toBeInTheDocument();
        expect(await screen.findByText(/Status/i)).toBeInTheDocument();
        expect(await screen.findByText(/Appointment Date/i)).toBeInTheDocument();
        expect(await screen.findByText(/Technician/i)).toBeInTheDocument();
    });
});
