const API_BASE_URL = 'https://realresume-app.sethkeddy.workers.dev';

export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

export async function saveResume(resumeData: Record<string, any>) {
  const token = localStorage.getItem('authToken');

  const response = await fetch('https://realresume-app.sethkeddy.workers.dev/api/resumes', {
    method: 'POST',
    body: resumeData,
  });

  if (!response.ok) {
    throw new Error('Failed to save resume');
  }

  return await response.json();
}

export async function getResumes(userId: string) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}/api/resumes/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resumes');
  }

  return await response.json();
}

export async function deleteResume(resumeId: string) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}/api/resumes/${resumeId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to delete resume');
  }
}
