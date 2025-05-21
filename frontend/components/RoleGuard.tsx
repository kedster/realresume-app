import React, { ReactNode, useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.role)) {
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
};

export default RoleGuard;