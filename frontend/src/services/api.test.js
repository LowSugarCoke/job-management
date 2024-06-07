import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchJobs, fetchJobById, createJob, updateJob, deleteJob } from './api'; 

describe('API tests', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    const jobData = {
        id: 1,
        customerName: "John Doe",
        jobType: "Plumbing",
        status: "Scheduled",
        appointmentDate: "2024-06-15T09:00:00Z",
        technician: "Jane Smith"
    };

    test('fetchJobs should return jobs data', async () => {
        const mockData = [jobData];
        mock.onGet('http://localhost:8000/jobs').reply(200, mockData);

        const jobs = await fetchJobs();
        expect(jobs).toEqual(mockData);
    });

    test('fetchJobById should return a single job data', async () => {
        mock.onGet(`http://localhost:8000/jobs/${jobData.id}`).reply(200, jobData);

        const job = await fetchJobById(jobData.id);
        expect(job).toEqual(jobData);
    });

    test('createJob should return created job data', async () => {
        const newJob = {
            customerName: "Alice Johnson",
            jobType: "Electrical",
            status: "Completed",
            appointmentDate: "2024-05-20T14:00:00Z",
            technician: "Bob Brown"
        };
        const createdJob = { id: 2, ...newJob };
        mock.onPost('http://localhost:8000/jobs').reply(201, createdJob);

        const job = await createJob(newJob);
        expect(job).toEqual(createdJob);
    });

    test('updateJob should return updated job data', async () => {
        const updatedJob = {
            customerName: "John Doe Updated",
            jobType: "Plumbing",
            status: "Scheduled",
            appointmentDate: "2024-06-16T10:00:00Z",
            technician: "Jane Smith"
        };
        const updatedJobData = { id: 1, ...updatedJob };
        mock.onPut(`http://localhost:8000/jobs/${jobData.id}`).reply(200, updatedJobData);

        const job = await updateJob(jobData.id, updatedJob);
        expect(job).toEqual(updatedJobData);
    });

    test('deleteJob should return deleted job data', async () => {
        mock.onDelete(`http://localhost:8000/jobs/${jobData.id}`).reply(200, jobData);

        const job = await deleteJob(jobData.id);
        expect(job).toEqual(jobData);
    });

    test('fetchJobs should handle error', async () => {
        mock.onGet('http://localhost:8000/jobs').reply(500);

        await expect(fetchJobs()).rejects.toThrow('Request failed with status code 500');
    });
});
