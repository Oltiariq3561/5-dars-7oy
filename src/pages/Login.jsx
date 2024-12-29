import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 5; // Password length must be at least 5
  };

  function validate() {
    if (username.length < 3) {
      alert("Username is not valid");
      return false;
    }
    if (!validatePassword(password)) {
      alert("Password is not valid. It must contain at least 5 characters, including a letter and a number.");
      return false;
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
  
    const user = {
      username,
      password,
    };
    setLoading(true);
    axios
      .post("https://auth-rg69.onrender.com/api/auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
          // Set token in state
          navigate("/"); 
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message || "An error occurred during login");
        } else {
          alert("Network error. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white font-extrabold text-4xl mb-8">Login</h1>
      <form className="bg-gray-800 text-gray-300 p-8 rounded-md shadow-md w-[400px] flex flex-col gap-4">
        <label className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 flex-grow"
          />
        </label>
        <label className="flex items-center gap-2 border-b border-gray-600 pb-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 flex-grow"
          />
        </label>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white font-bold py-2 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link to="/register" className="text-blue-400 text-center">Akkaunt yaratish</Link>
      </form>
    </div>
  );
}

export default App;
