const mysql = require("mysql");

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DBNAME,
};

const db = mysql.createPool(dbConfig);

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, sql) => {
      if (err) {
        console.log("Error DB: ", err);
        reject(err);
      } else {
        sql.query(query, (err, results) => {
          if (err) {
            console.log("Error DB query: ", err);
            reject(err);
          } else {
            resolve(results);
          }
        });

        sql.release();
      }
    });
  });
};
