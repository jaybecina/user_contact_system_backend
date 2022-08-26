const Connection = require("../config/database");

module.exports = async ({
  id,
  username,
  password,
  fullname,
  profile_picture,
  address,
  contact_num,
}) => {
  try {
    const query =
      `UPDATE ` +
      `users ` +
      `SET ` +
      `username = '${username}', ` +
      `password = '${password}', ` +
      `fullname = '${fullname}', ` +
      `profile_picture = '${profile_picture}', ` +
      `address = '${address}', ` +
      `contact_num = '${contact_num}' ` +
      `WHERE ` +
      `id = ${id}`;

    await Connection(query);

    return true;
  } catch (error) {
    console.log("Error DB query: ", error);
    return false;
  }
};
