import express from "express";
import Employee from "../models/Employee.js";
import middleware from "../utils/middleware.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const {
        firstname,
        lastname,
        email,
        role,
        department,
        telephone,
        profilePicture,
      } = req.body;

      const newEmployee = new Employee({
        firstname,
        lastname,
        email,
        role,
        department,
        telephone,
        profilePicture,
        user: req.user._id,
      });

      const addedEmployee = await newEmployee.save();
      return res.status(201).json(addedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const body = req.body;
      const employee = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        role: body.role,
        department: body.department,
        telephone: body.telephone,
        profilePicture: body.profilePicture,
      };

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        employee,
        { new: true }
      );

      return res.status(200).json(updatedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  middleware.userExtractor,
  middleware.isAdmin,
  async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedEmployee);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
