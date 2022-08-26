const express = require("express");
const router = express.Router();

const {
  getUsers,
  getOneUser,
  addUser,
  editUser,
  deleteUser,
  authUser,
} = require("../controllers/UserController");

router.get("/get-users", getUsers);

router.get("/get-user/:id", getOneUser);

router.post("/add-user", addUser);

router.put("/edit-user/:id", editUser);

router.delete("/delete-user/:id", deleteUser);

router.post("/auth", authUser);

module.exports = router;
