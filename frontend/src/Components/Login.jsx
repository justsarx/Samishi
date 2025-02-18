/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:8000/api/login/", { username, password });

      localStorage.setItem("token", response.data.token);
      console.log("Login successful!", response.data.token);
      setSuccess(true);
      // Redirect or update UI
      window.location.href = "/dashboard"; // Or use React Router
    } catch (error) {
      if (error.response) {
        // Server responded with an error (e.g., 400, 401)
        const errorMessage = error.response.data.error || "Login failed"; // Extract error message
        setError(errorMessage);
        console.error("Login failed:", error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        setError("No response from the server.");
        console.error("No response:", error.request);
      } else {
        // Something happened in setting up the request
        setError("An error occurred: " + error.message);
        console.error("Error:", error); // Log the full error object for debugging
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        {error && <p className="text-danger mt-2">{error}</p>} {/* Display error message */}
        {success && <p className="text-success mt-2">Login successful!</p>}
      </form>
    </div>
  );
};

export default Login;