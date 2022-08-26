const Connection = require("../config/database");

module.exports = async ({ id }) => {
  try {
    const query = `DELETE FROM users WHERE id = ${id}`;

    await Connection(query);

    return true;
  } catch (error) {
    console.log("Error DB query: ", error);
    return false;
  }
};
