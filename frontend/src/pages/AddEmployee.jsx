import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/employees", {
        ...employee,
        salary: Number(employee.salary), // ✅ convert to number
      });

      console.log(res.data);

      alert("Employee Added ✅");
      navigate("/home");

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <br /><br />

        <input name="email" placeholder="Email" onChange={handleChange} required />
        <br /><br />

        <input name="position" placeholder="Position" onChange={handleChange} required />
        <br /><br />

        <input name="salary" placeholder="Salary" onChange={handleChange} required />
        <br /><br />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;