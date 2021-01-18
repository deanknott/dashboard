const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const patientsRouter = require('./routes/patients');

const neatCsv = require('neat-csv');
const fs = require('fs');
const $ = jQuery = require('jquery');
const csv = require("csvtojson");

const bcrypt = require('bcrypt');

const app = express();

const port = process.env.PORT || 5000;
const mysql = require('mysql');

const SELECT_PATIENTS_QUERY = 'SELECT classification.id, patients.first_name, patients.last_name, patients.age, classification.classification, patients.notes FROM classification INNER JOIN patients ON classification.id = patients.id';
const SELECT_PATIENT_FEATURES = 'SELECT features.question_id, classification.id, patients.first_name, ' +
  'patients.last_name, patients.age, classification.classification, features.pauses, ' +
  'features.number_words, features.empty_words, features.fillers, features.variety,' +
  'features.length, patients.notes FROM classification ' +
  'INNER JOIN patients ON classification.id = patients.id ' +
  'INNER JOIN features ON features.id = patients.id ';

const SELECT_ALL_USERS_QUERY = 'SELECT * FROM users;';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dean_dissertation_db'
});

connection.connect(err => {
  if(err) {
    return res.send(err);
  } else {
    console.log("connected to database");
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('go to /patients to see patients')
});

app.get('/signin', (req, res) => {
  connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json({
        data:results
      });
    }
  });
});

app.post('/signin', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
  if (email && password) {
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.writeHead(301, {
          Location: 'http://localhost:3000/patients'
        });
			} else {
				res.send('Incorrect Username and/or Password!');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.get('/patients', (req, res) => {
  connection.query(SELECT_PATIENTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json({
        data:results
      });
    }
  });
});

app.get('/patients/:id', function(req, res) {
  var id = req.params.id;
  connection.query(SELECT_PATIENT_FEATURES + 'WHERE patients.id = ?', [id], (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.json({
        data:results
      });
    }
  });
});

app.post('/patients/:id', function(req, res) {
  var id = req.params.id;
  var notes = req.body.notes;
  connection.query('UPDATE patients SET notes = ? WHERE id = ?', [notes, id], (err, results) => {
    if(err) {
      return res.send(err);
    } else {
      return res.status(204).send();
    }
  });
});

// app.use('/users', usersRouter);
// app.use('/patients', patientsRouter);

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
