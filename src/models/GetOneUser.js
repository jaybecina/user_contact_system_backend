const Connection = require("../config/database");

module.exports = async ({ id }) => {
  try {
    const query = `SELECT * FROM users WHERE id = ${id}`;

    const results = await Connection(query);

    return results;
  } catch (error) {
    console.log("Error DB query: ", error);
    return null;
  }
};
