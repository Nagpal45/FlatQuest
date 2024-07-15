import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try{
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password
    });
    navigate("/login");
    }
    catch(err){
      setError(err.response.data.message);
    }finally{
      setIsLoading(false);
    }
}

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit = {handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username"
          required
          minLength="3"
          maxLength="20"
           />
          <input name="email" type="text" placeholder="Email"
          required
           />
          <input name="password" type="password" placeholder="Password"
          required
           />
          <button disabled={isLoading} >Register</button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;