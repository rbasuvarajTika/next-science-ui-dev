import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthPage'; // Import your authentication context or logic here

export function PrivateRoute({ element, allowedRoles }) {
  const { userRole } = useAuth(); // Get the user's role from the context

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to the login page if the user is not logged in or has an invalid role
    return <Navigate to="/" />;
  }

  // Render the route's element if the user has an allowed role
  return <Route element={element} />;
}
