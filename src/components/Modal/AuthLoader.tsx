import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../API";

const AuthLoader = () => {
  const navigate = useNavigate(); // Access history object for navigation

  interface UserData {
    user: {
      username: string;
      profilePic: string;
      email: string;
      // Add other user-specific fields here
    };
  }
  const [userData, setUserData] = useState<UserData | null>(null);

  const manuallyLogged = window.localStorage.getItem('data');
  if (!manuallyLogged) {
    window.localStorage.setItem('token', userData?.token);
    const stringifiedUser = JSON.stringify(userData?.user);
    window.localStorage.setItem('user', stringifiedUser);
    // Redirect to "/super-admin/dashboard"
    navigate("/super-admin/dashboard");
  }

  useEffect(() => {
    // Make an API call to fetch user data
    fetch_O_Auth_UserData();
  }, []); // Empty dependency array ensures this effect runs only once

  const fetch_O_Auth_UserData = async () => {
    try {
      // Make a GET request to your server endpoint to fetch user data
      const response = await fetch(`${API}`); // Update URL as needed
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      // Parse the JSON response
      const userData: UserData = await response.json();
      // Update state with user data
      setUserData(userData);

    } catch (error: any) {
      console.error('Error fetching user data:', error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default AuthLoader;
