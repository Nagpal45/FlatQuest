import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try{
      const res = await apiRequest.post("/auth/login", {
        username,
        password
    });
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/");
    }
    catch(err){
      setError(err.response.data.message);
    }finally{
      setIsLoading(false);
    }
}
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit = {handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username"
          required
          minLength="3"
          maxLength="20"
           />
          <input name="password" type="password" placeholder="Password"
          required
           />
          <button disabled={isLoading}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;