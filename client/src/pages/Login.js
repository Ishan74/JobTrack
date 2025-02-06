import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import backgroundVideo from "./happy.mp4";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const expiry = localStorage.getItem("jwt_expiry");
      if (expiry && new Date().getTime() > parseInt(expiry, 10)) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("jwt_expiry");
      } else {
        navigate("./Dashboard");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("jwt", data.token);
          localStorage.setItem(
            "jwt_expiry",
            (new Date().getTime() + 60 * 60 * 1000).toString()
          );
          alert("Login successful!");
          navigate("./Dashboard");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white", marginBottom: "20px", fontSize: "2.5rem", fontWeight: "bold" }}>
          Welcome To Job Track
        </h1>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
              }}
            >
              Login
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
