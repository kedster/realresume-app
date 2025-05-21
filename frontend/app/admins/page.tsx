"use client";

import React, { useState } from "react";

const TABS = [
  { key: "resumes", label: "Manage Resumes" },
  { key: "users", label: "Manage Users" },
  { key: "roles", label: "Manage Roles" },
  { key: "settings", label: "Settings" },
  { key: "reports", label: "Reports" },
];

export default function AdminsPage() {
  const [activeTab, setActiveTab] = useState("resumes");

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Admins Dashboard</h1>
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
              Block or remove any resumes submitted by users.
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
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p className="mb-4 text-gray-600">
              Block, remove, or grant access to users.
            </p>
            <div className="border rounded p-4 bg-gray-50 mb-2">
              <div className="flex justify-between items-center">
                <span>Alice Johnson (alice@example.com)</span>
                <div>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                    Block
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded mr-2 hover:bg-red-700">
                    Remove
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Grant Access
                  </button>
                </div>
              </div>
            </div>
            <div className="border rounded p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <span>Bob Smith (bob@example.com)</span>
                <div>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                    Block
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded mr-2 hover:bg-red-700">
                    Remove
                  </button>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Grant Access
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === "roles" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Manage Roles</h2>
            <p className="mb-4 text-gray-600">
              Assign or change user roles (Seeker, Recruiter, Admin, Tech).
            </p>
            <div className="border rounded p-4 bg-gray-50">
              <div className="flex items-center space-x-4">
                <span>Alice Johnson</span>
                <select className="border rounded px-2 py-1">
                  <option>Seeker</option>
                  <option>Recruiter</option>
                  <option>Admin</option>
                  <option>Tech</option>
                </select>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Update Role
                </button>
              </div>
            </div>
          </section>
        )}
        {activeTab === "settings" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="mb-4 text-gray-600">
              Configure platform settings and preferences.
            </p>
            <div className="border rounded p-4 bg-gray-50">
              <label className="block mb-2">
                <span className="mr-2">Enable notifications</span>
                <input type="checkbox" className="align-middle" />
              </label>
              <label className="block">
                <span className="mr-2">Allow public profiles</span>
                <input type="checkbox" className="align-middle" />
              </label>
            </div>
          </section>
        )}
        {activeTab === "reports" && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Reports</h2>
            <p className="mb-4 text-gray-600">
              View analytics and reports about users, resumes, and activity.
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