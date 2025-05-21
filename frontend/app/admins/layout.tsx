import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        {/* Add navigation links specific to Admins here */}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;