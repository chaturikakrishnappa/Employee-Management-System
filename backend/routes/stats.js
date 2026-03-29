const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET dashboard statistics
router.get("/", async (req, res) => {
  try {
    const totalEmployees = await prisma.employee.count();

    res.json({
      totalEmployees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;