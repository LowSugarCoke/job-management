import React from 'react';
import { render, screen } from '@testing-library/react';
import JobTable from '.';

describe('JobTable component', () => {
    test('renders table headers correctly', async () => {
        render(<JobTable />);

        expect(await screen.findByText(/ID/i)).toBeInTheDocument();
        expect(await screen.findByText(/Customer Name/i)).toBeInTheDocument();
        expect(await screen.findByText(/Job Type/i)).toBeInTheDocument();
        expect(await screen.findByText(/Status/i)).toBeInTheDocument();
        expect(await screen.findByText(/Appointment Date/i)).toBeInTheDocument();
        expect(await screen.findByText(/Technician/i)).toBeInTheDocument();
    });
});
