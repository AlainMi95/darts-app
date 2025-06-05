import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // Check if user is admin (email is alain@michienzi.dev)
  const isAdmin = user?.email === 'alain@michienzi.dev';

  if (loading) {
    return <div>Loading admin access...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/darts" replace />;
  }

  return children;
};

export default AdminRoute;
