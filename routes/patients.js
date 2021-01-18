const mysql = require('mysql');

module.exports = (app, connection) => {
  app.get('/patients', (req, res) => {
    connection.query("SELECT * FROM patients", (err,data) => {
      (err)?res.send(err):res.json({patients: data});
    });
  });
}
