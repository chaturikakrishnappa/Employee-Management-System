import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditEmployee() {
  const { id } = useParams();
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

  // GET employee by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await API.get(`/employees/${id}`);
      setEmployee(res.data);
    };

    fetchEmployee();
  }, [id]);

  // UPDATE employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/employees/${id}`, {
        ...employee,
        salary: Number(employee.salary),
      });

      alert("Employee Updated ✅");
      navigate("/home");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={employee.name} onChange={handleChange} />
        <br /><br />

        <input name="email" value={employee.email} onChange={handleChange} />
        <br /><br />

        <input name="position" value={employee.position} onChange={handleChange} />
        <br /><br />

        <input name="salary" value={employee.salary} onChange={handleChange} />
        <br /><br />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;