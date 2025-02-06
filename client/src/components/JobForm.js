import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_JOB } from '../utils/mutations';

const JobForm = () => {
  const [formState, setFormState] = useState({ company: '', position: '', status: 'Applied' });
  const [addJob] = useMutation(ADD_JOB);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addJob({ variables: { ...formState } });
    setFormState({ company: '', position: '', status: 'Applied' });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded-lg" name="company" placeholder="Company" value={formState.company} onChange={handleChange} required />
        <input className="w-full p-2 border rounded-lg" name="position" placeholder="Position" value={formState.position} onChange={handleChange} required />
        <select className="w-full p-2 border rounded-lg" name="status" value={formState.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offered">Offered</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition">Add Job</button>
      </form>
    </div>
  );
};

export default JobForm;
