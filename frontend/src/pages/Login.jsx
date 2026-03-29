import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "ADMIN"); // temporary role 

      alert("Login Successful ✅");

      navigate("/home");
     } catch (err) {
      alert("Invalid Credentials ❌");
      console.log(err);
     }
   };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Employee Management Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;