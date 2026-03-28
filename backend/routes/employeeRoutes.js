const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, employeeController.createEmployee);

// GET ALL
router.get("/", authMiddleware, employeeController.getEmployees);

// GET ONE
router.get("/:id", authMiddleware, employeeController.getEmployeeById);

// UPDATE
router.put("/:id", authMiddleware, employeeController.updateEmployee);

// DELETE
router.delete("/:id", authMiddleware, employeeController.deleteEmployee);

module.exports = router;