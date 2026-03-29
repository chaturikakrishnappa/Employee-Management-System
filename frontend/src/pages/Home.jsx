import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();  

  const role = localStorage.getItem("role");
  
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({});

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

 // fetch dashboard stats
 const getStats = async () => {
  try {
    const res = await API.get("/stats");
    setStats(res.data);
  } catch (error) {
    console.log("Stats error:", error);
  }
 };

  useEffect(() => {
  getEmployees();
  getStats();
 }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Employee Dashboard</h2>

      {role === "ADMIN" && (
        <button onClick={() => navigate("/add")}>
          Add Employee
        </button>
      )}

      <div style={{ marginBottom: "20px" }}>
        <h3>Total Employees: {stats.totalEmployees || 0}</h3>
      </div>

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
      {role === "ADMIN" && (
       <>
        <button onClick={() => navigate(`/edit/${emp._id}`)}>
          Edit
        </button>

        <button
             onClick={() => deleteEmployee(emp._id)}
             style={{ marginLeft: "10px" }}
          >
             Delete
            </button>
          </>
         )}
        </td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;