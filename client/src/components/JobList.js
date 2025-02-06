import React from 'react';

const JobList = ({ jobs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">{job.company} - {job.position}</h3>
            <p className={`text-sm font-medium ${job.status === "Applied" ? "text-blue-500" : job.status === "Interview" ? "text-orange-500" : job.status === "Rejected" ? "text-red-500" : "text-green-500"}`}>
              Status: {job.status}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
