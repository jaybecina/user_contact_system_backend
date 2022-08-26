const Connection = require("../config/database");

module.exports = async () => {
  try {
    const query = "SELECT * FROM users";

    const results = await Connection(query);

    return results;
  } catch (error) {
    console.log("Error DB query: ", error);
    return null;
  }
};
