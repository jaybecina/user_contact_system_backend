const Connection = require("../config/database");

module.exports = async ({ username }) => {
  try {
    const query = `SELECT * FROM users WHERE username = '${username}'`;

    const results = await Connection(query);

    return results;
  } catch (error) {
    console.log("Error DB query: ", error);
    return null;
  }
};
