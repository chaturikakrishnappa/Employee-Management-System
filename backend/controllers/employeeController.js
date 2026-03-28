const prisma = require("../config/prisma");

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    console.log("🔥 createEmployee called");
    console.log("BODY RECEIVED:", req.body);

    const { name, email, position, salary } = req.body;

    // validation
    if (!name || !email || !position || !salary) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ PRISMA CREATE (THIS IS THE FIX)
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        position,
        salary: Number(salary),
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL
const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET BY ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(req.params.id) },
    });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteEmployee = async (req, res) => {
  try {
    await prisma.employee.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};