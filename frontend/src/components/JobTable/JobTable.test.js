import React from 'react';
import { render, screen } from '@testing-library/react';
import JobTable from '.';

describe('JobTable component', () => {
    test('renders table headers correctly', () => {
        render(<JobTable />);

        expect(screen.getByText(/ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Job Type/i)).toBeInTheDocument();
        expect(screen.getByText(/Status/i)).toBeInTheDocument();
        expect(screen.getByText(/Appointment Date/i)).toBeInTheDocument();
        expect(screen.getByText(/Technician/i)).toBeInTheDocument();
    });
});
