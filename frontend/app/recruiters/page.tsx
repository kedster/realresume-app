"use client";

import React, { useState } from 'react';

// Mock seeker data
const seekers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    locationType: "remote",
    location: "",
    fileName: "alice_resume.pdf",
    fileUrl: "/uploads/alice_resume.pdf",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    locationType: "location",
    location: "New York, NY",
    fileName: "bob_resume.docx",
    fileUrl: "/uploads/bob_resume.docx",
  },
  // Add more mock seekers as needed
];

// Helper to get file extension
const getFileType = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext === "doc") return "DOC";
  if (ext === "docx") return "DOCX";
  return "Other";
};

const uniqueLocations = [
  ...new Set(
    seekers.map(s =>
      s.locationType === "remote"
        ? "Remote"
        : s.location || "Unknown"
    )
  ),
];

const uniqueFileTypes = [
  ...new Set(seekers.map(s => getFileType(s.fileName))),
];

const RecruitersPage = () => {
  const [keyword, setKeyword] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [fileTypeFilter, setFileTypeFilter] = useState("All");

  const filteredSeekers = seekers.filter(seeker => {
    // Location filter
    const seekerLocation =
      seeker.locationType === "remote"
        ? "Remote"
        : seeker.location || "Unknown";
    if (locationFilter !== "All" && seekerLocation !== locationFilter) {
      return false;
    }

    // File type filter
    const seekerFileType = getFileType(seeker.fileName);
    if (fileTypeFilter !== "All" && seekerFileType !== fileTypeFilter) {
      return false;
    }

    // Keyword filter
    const keywordLower = keyword.toLowerCase();
    if (
      keyword &&
      !(
        seeker.name.toLowerCase().includes(keywordLower) ||
        seeker.email.toLowerCase().includes(keywordLower) ||
        (seeker.location && seeker.location.toLowerCase().includes(keywordLower))
      )
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Recruiters Dashboard</h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or location..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Locations</option>
          {uniqueLocations.map(loc => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select
          value={fileTypeFilter}
          onChange={e => setFileTypeFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="All">All Resume Types</option>
          {uniqueFileTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSeekers.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No seekers found.</div>
        ) : (
          filteredSeekers.map(seeker => (
            <div key={seeker.id} className="border rounded p-4 shadow-sm bg-gray-50">
              <h2 className="text-lg font-semibold">{seeker.name}</h2>
              <p className="text-gray-700">{seeker.email}</p>
              <p className="text-gray-700">
                {seeker.locationType === "remote"
                  ? "Remote"
                  : `Location: ${seeker.location}`}
              </p>
              <p className="text-gray-700">
                Resume Type: {getFileType(seeker.fileName)}
              </p>
              <a
                href={seeker.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
                download
              >
                {seeker.fileName}
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecruitersPage;