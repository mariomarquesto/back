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
  getAllParents,
  allStudents,
} = require("../controllers/adminController");
const { allgrades } = require("../controllers/gradeController");

const adminRoutes = Router();

adminRoutes.get("/admin/allParents", getAllParents);
adminRoutes.get("/admin/allStudents", allStudents);
adminRoutes.get("/admin/allGrades", allgrades);

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
