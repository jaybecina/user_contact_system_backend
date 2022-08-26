const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const CreateUserService = require("../models/CreateUser");
const GetUserService = require("../models/GetUser");
const GetOneUserService = require("../models/GetOneUser");
const UpdateUserService = require("../models/UpdateUser");
const DeleteUserService = require("../models/DeleteUser");
const CheckUserService = require("../models/CheckUser");

// @desc Get users
// @route GET /api/users/get-users
const getUsers = async (req, res) => {
  const results = await GetUserService();

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(500).send({
      status: results,
      message: "User fetching failed!",
    });
  }
};

// @desc Get one user
// @route GET /api/users/get-user/{id}
const getOneUser = async (req, res) => {
  const results = await GetOneUserService({ id: req.params.id });

  if (results) {
    res.status(200).send(results);
  } else {
    res.status(500).send({
      status: results,
      message: "User fetching failed!",
    });
  }
};

// @desc Add users
// @route Post /api/users/add-user
const addUser = async (req, res) => {
  try {
    const {
      username,
      password,
      fullname,
      profile_picture,
      address,
      contact_num,
    } = req.body;

    // Check for username
    const user = await CheckUserService({ username });

    const errArr = [];
    if (user.length > 0) {
      errArr.push("Already have an account");
    }
    if (!username) {
      errArr.push("Username field required");
    }
    if (!password) {
      errArr.push("Password field required");
    }
    if (!fullname) {
      errArr.push("Fullname field required");
    }
    if (!profile_picture) {
      errArr.push("Profile picture field required");
    }
    if (!address) {
      errArr.push("Address field required");
    }
    if (!contact_num) {
      errArr.push("Contact_num field required");
    }

    if (errArr.length > 0) {
      const errString = errArr?.join(", ");
      res.status(400).send({
        status: 400,
        message: errString,
      });
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const results = await CreateUserService({
        username,
        password: hashedPassword,
        fullname,
        profile_picture,
        address,
        contact_num,
      });

      if (results) {
        res.status(200).send({
          status: 200,
          message: "User successfully created!",
        });
      } else {
        res.status(500).send({
          status: 500,
          message: "User creation failed!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
    // throw new Error(error.message);
  }
};

// @desc Edit users
// @route Put /api/users/edit-user/{id}
const editUser = async (req, res) => {
  try {
    const {
      username,
      password,
      fullname,
      profile_picture,
      address,
      contact_num,
    } = req.body;

    const errArr = [];
    if (!username) {
      errArr.push("Username field required");
    }
    if (!password) {
      errArr.push("Password field required");
    }
    if (!fullname) {
      errArr.push("Fullname field required");
    }
    if (!profile_picture) {
      errArr.push("Profile picture field required");
    }
    if (!address) {
      errArr.push("Address field required");
    }
    if (!contact_num) {
      errArr.push("Contact_num field required");
    }

    if (errArr.length > 0) {
      const errString = errArr?.join(", ");
      res.status(400).send({
        status: 400,
        message: errString,
      });
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const results = await UpdateUserService({
        id: req.params.id,
        username,
        password: hashedPassword,
        fullname,
        profile_picture,
        address,
        contact_num,
      });

      if (results) {
        res.status(200).send({
          status: results,
          message: "User successfully updated!",
        });
      } else {
        res.status(500).send({
          status: results,
          message: "User updating failed!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error,
    });
  }
};

// @desc Delete users
// @route Delete /api/users/delete-user/{id}
const deleteUser = async (req, res) => {
  const results = await DeleteUserService({ id: req.params.id });

  if (results) {
    res.status(200).send({
      status: results,
      message: "User successfully deleted!",
    });
  } else {
    res.status(500).send({
      status: results,
      message: "User deleting failed!",
    });
  }
};

// @desc Authenticate a user
// @route Post /api/users/auth
// @access Public
const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const errEmptyArr = [];

    if (!username) {
      errEmptyArr.push("Username field required");
    }
    if (!password) {
      errEmptyArr.push("Password field required");
    }

    if (errEmptyArr.length > 0) {
      const errString = errEmptyArr?.join(", ");

      res.status(400).send({
        status: 400,
        message: errString,
      });
    } else {
      // Check for username
      const user = await CheckUserService({ username });

      if (user.length === 0) {
        res.status(400).send({
          status: 400,
          message: "Invalid username",
        });
      } else {
        const validatePassword = await bcrypt.compare(
          password,
          user[0]?.password
        );

        if (!validatePassword) {
          res.status(400).send({
            status: 400,
            message: "Invalid password",
          });
        }

        const token = jwt.sign({ id: user[0]?.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(201).json({
          id: user[0]?.id,
          username: user[0]?.username,
          fullname: user[0]?.fullname,
          profile_picture: user[0]?.profile_picture,
          address: user[0]?.address,
          contact_num: user[0]?.contact_num,
          token,
        });
      }
    }
  } catch (error) {}
};

module.exports = {
  getUsers,
  getOneUser,
  addUser,
  editUser,
  deleteUser,
  authUser,
};
