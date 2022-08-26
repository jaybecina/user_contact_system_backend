const Connection = require("../config/database");

module.exports = async ({
  username,
  password,
  fullname,
  profile_picture,
  address,
  contact_num,
}) => {
  try {
    const query =
      `INSERT INTO ` +
      `users ` +
      `VAlUES ` +
      `(null, '${username}', '${password}', '${fullname}', '${profile_picture}', '${address}', '${contact_num}')`;

    await Connection(query);

    return true;
  } catch (error) {
    console.log("Error DB query: ", error);
    return false;
  }
};
