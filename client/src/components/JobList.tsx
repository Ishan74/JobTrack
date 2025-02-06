import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <div>
      {jobs && jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job._id}>
            <h3>{job.company} - {job.position}</h3>
            <p>Status: {job.status}</p>
          </div>
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
