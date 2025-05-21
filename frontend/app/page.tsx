"use client";

import React, { useState, useEffect } from 'react';
import { loginUser } from '../utils/api'; // adjust path if needed

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Google SSO logic
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    const handleCredentialResponse = async (response: any) => {
      // You get a JWT here from Google
      console.log('Google credential:', response.credential);

      // Send JWT to your backend for verification and login
      const res = await fetch('http://localhost:8787/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();
      console.log('Backend login response:', data);
      // You can store token or redirect here as needed
    };

    const initializeGoogleSSO = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById('google-login-button'),
        { theme: 'outline', size: 'large' }
      );
    };

    // Load the Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSSO;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(username, password);
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to RealResume</h1>
      <p className="mt-4 text-lg">Your active resume hosting platform.</p>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      <div className="mt-6">
        <div id="google-login-button"></div>
      </div>
    </div>
  );
};

export default HomePage;