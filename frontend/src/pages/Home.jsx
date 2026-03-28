import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();  

  const [employees, setEmployees] = useState([]);

  // fetch employees
  const getEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch employees");
    }
  };

  const deleteEmployee = async (id) => {
  try {
    await API.delete(`/employees/${id}`);
    alert("Employee Deleted ✅");

    // reload list
    setEmployees(employees.filter(emp => emp.id !== id));

  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
 };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Employee Dashboard</h2>

      <button onClick={() => navigate("/add")}>
        Add Employee
      </button>

      <table border="1" align="center" cellPadding="10">
       <thead>
       <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Position</th>
        <th>Salary</th>
        <th>Actions</th> {/* ✅ ADD THIS */}
       </tr>
       </thead>

       <tbody>
       {employees.map((emp) => (
        <tr key={emp.id}> {/* ✅ FIXED */}
        <td>{emp.name}</td>
        <td>{emp.email}</td>
        <td>{emp.position}</td>
        <td>{emp.salary}</td>

        <td>
          <button onClick={() => navigate(`/edit/${emp.id}`)}>
            Edit
          </button>

          <button
            onClick={() => deleteEmployee(emp.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;