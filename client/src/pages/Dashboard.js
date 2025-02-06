import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../utils/queries';
import JobList from '../components/JobList';

const Dashboard = () => {
  const { loading, data } = useQuery(GET_JOBS);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f4', padding: '40px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>Job Application Tracker</h1>
      
      <div style={{ width: '90%', maxWidth: '1000px', backgroundColor: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {['Applied', 'Interview', 'Rejected', 'Offered'].map((status) => (
            <div key={status} style={{ padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#444' }}>{status}</h2>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                {data?.getJobs ? data.getJobs.filter(job => job.status === status).length : 0}
              </p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#444', marginBottom: '20px', textAlign: 'center' }}>Your Applications</h2>
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <JobList jobs={data?.getJobs || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
