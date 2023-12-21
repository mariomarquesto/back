const { Router } = require("express");
const {
  getParentsActive,
  getStudentsActive,
  getParentsPending,
  getStudentsPending,
  studentDetail,
  approvedStudent,
  parentDetail,
  approvedParent,
  admin,
} = require("../controllers/adminController");

const adminRoutes = Router();

adminRoutes.get("/admin/parents-Active", getParentsActive);

adminRoutes.get("/admin/parents-Pending", getParentsPending);

adminRoutes.get("/admin/parentDetail/:id", parentDetail);

adminRoutes.put("/admin/parentDetail/:id", approvedParent);

adminRoutes.get("/admin/students-Active", getStudentsActive);

adminRoutes.get("/admin/students-Pending", getStudentsPending);

adminRoutes.get("/admin/studentDetail/:id", studentDetail);

adminRoutes.put("/admin/studentDetail/:id", approvedStudent);

adminRoutes.get("/admin/:id", admin);

module.exports = adminRoutes;
