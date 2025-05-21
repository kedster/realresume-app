"use client";

import React, { useState } from "react";

const TABS = [
  { key: "resumes", label: "Manage Resumes" },
  { key: "users", label: "View Users" },
  { key: "roles", label: "View Roles" },
  { key: "settings", label: "View Settings" },
  { key: "reports", label: "View Reports" },
];

export default function TechsPage() {
  const [activeTab, setActiveTab] = useState("resumes");

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Techs Dashboard</h1>
      <div className="flex space-x-4 border-b mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "resumes" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Manage Resumes</h2>
            <p className="mb-4 text-gray-600">
              You can block or remove resumes.
            </p>
            <div className="border rounded p-4 bg-gray-50 mb-2">
              <div className="flex justify-between items-center">
                <span>alice_resume.pdf (Alice Johnson)</span>
                <div>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                    Block
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="border rounded p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <span>bob_resume.docx (Bob Smith)</span>
                <div>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                    Block
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === "users" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">View Users</h2>
            <p className="mb-4 text-gray-600">
              Read-only view of users.
            </p>
            <div className="border rounded p-4 bg-gray-50 mb-2">
              <span>Alice Johnson (alice@example.com)</span>
            </div>
            <div className="border rounded p-4 bg-gray-50">
              <span>Bob Smith (bob@example.com)</span>
            </div>
          </section>
        )}
        {activeTab === "roles" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">View Roles</h2>
            <p className="mb-4 text-gray-600">
              Read-only view of user roles.
            </p>
            <div className="border rounded p-4 bg-gray-50">
              <span>Alice Johnson - Seeker</span>
            </div>
            <div className="border rounded p-4 bg-gray-50 mt-2">
              <span>Bob Smith - Recruiter</span>
            </div>
          </section>
        )}
        {activeTab === "settings" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">View Settings</h2>
            <p className="mb-4 text-gray-600">
              Platform settings (read-only).
            </p>
            <div className="border rounded p-4 bg-gray-50">
              <div>Enable notifications: Yes</div>
              <div>Allow public profiles: No</div>
            </div>
          </section>
        )}
        {activeTab === "reports" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">View Reports</h2>
            <p className="mb-4 text-gray-600">
              Analytics and reports (read-only).
            </p>
            <div className="border rounded p-4 bg-gray-50">
              <ul className="list-disc pl-5">
                <li>Total users: 2</li>
                <li>Active resumes: 2</li>
                <li>Blocked users: 0</li>
                <li>Blocked resumes: 0</li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}