/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// PublicRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUsers } from "./services"; // Import the getUsers function from your services

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await getUsers();
        if (response && response.status === 200) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  // Redirect to home if authenticated, otherwise render the public page
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
