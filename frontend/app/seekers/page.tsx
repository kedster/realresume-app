"use client";

import React, { useState } from 'react';

const SeekerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [locationType, setLocationType] = useState('remote');
  const [location, setLocation] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission (e.g., send to API)
    alert('Form submitted!');
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Seeker Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Upload Resume (PDF or Word)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Where are you looking for work?</label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                value="remote"
                checked={locationType === 'remote'}
                onChange={() => setLocationType('remote')}
                className="mr-1"
              />
              Remote
            </label>
            <label>
              <input
                type="radio"
                value="location"
                checked={locationType === 'location'}
                onChange={() => setLocationType('location')}
                className="mr-1"
              />
              Specific Location
            </label>
          </div>
          {locationType === 'location' && (
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Enter city, state, or country"
              className="w-full border rounded px-2 py-1 mt-2"
              required
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SeekerPage;