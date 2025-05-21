

// This file contains functions to interact with the backend API for user authentication and resume management.
// It includes functions for logging in, saving resumes, fetching resumes, and deleting resumes.
export async function loginUser(username, password) {
  const response = await fetch('http://localhost:8787/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  return data;
}

export async function saveResume(resumeData) {
  const token = localStorage.getItem('authToken');

  const response = await fetch('http://localhost:8787/api/resumes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    throw new Error('Failed to save resume');
  }

  const data = await response.json();
  return data;
}

export async function getResumes() {
  const token = localStorage.getItem('authToken');

  const response = await fetch('http://localhost:8787/api/resumes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resumes');
  }

  const data = await response.json();
  return data;
}

export async function deleteResume(resumeId) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`http://localhost:8787/api/resumes/${resumeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete resume');
  }

  return;
}