import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../Store/Auth-context";

function Display() {
  const { token } = useContext(AuthContext); // Use context to get the token
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAq3UUsh6wr0Dnf9bCJBO7TfxPTIzPkPbY",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken: token }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorData.error.message}`
          );
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setError("No token available");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Data</h2>
      {userData ? (
        <>
          <h4>Name: {userData.users[0].displayName}</h4>
          <h4>Profile: {userData.users[0].photoUrl}</h4>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Display;
