const mysql = require("mysql");
const CREDENTIALS = require("../config/mysql");

function connection() {
  const connection = mysql.createConnection(CREDENTIALS);
  return connection;
}

function consultImages(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let documentReportId = data.documentReportId;
    let select = `SELECT * FROM ${process.env.TABLE_IMAGE} WHERE documentReportId = ?`;
    let query = mysqlConnection.format(select, [documentReportId]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function uploadImages(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let insert = `INSERT INTO ${process.env.TABLE_IMAGE} SET ?`;
    let query = mysqlConnection.format(insert, [data]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

module.exports = {
  connection,
  consultImages,
  uploadImages,
};