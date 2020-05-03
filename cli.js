const inquirer = require("inquirer");
const cTable = console.table;
var mysql = require("mysql");

////////////MYSQL////////////////////////////////////////////////////////////////////////


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "empTrackDB"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

////////////QUESTIONS///////////////////////////////////////////////////////////////////////

var iniQues = [
  {
    type: 'list',
    name: 'iniQuestion',
    message: 'What would you like to do?',
    choices: ['add department', 'add role', 'add employee', 'view departments', 'view roles', 'view employees', 'update role']
  }
];

var addEmplQues = [
  { name: 'addFirst', message: 'Employee first name:' },
  { name: 'addLast', message: 'Employee last name:' }
];

var addRoleQues = [
  { name: 'title', message: 'Role Title:' },
  { name: 'salary', message: 'Role Salary:' }
];

var addDeptQues = [
  { name: 'dept', message: 'Name of New Department:' },
];



////////////VIEW FUNC////////////////////////////////////////////////////////////////////////

var viewDept = function () {
  connection.query("SELECT * FROM departments;", function (err, data) {
    if (err) { return res.status(500).end() }
    console.log('-----------------------------');
    console.table(data);
  });
  initialQues();
};

var viewRole = function () {
  connection.query("SELECT * FROM roles;", function (err, data) {
    if (err) { return res.status(500).end() }
    console.log('-----------------------------');
    console.table(data);
  });
  initialQues();
};

var viewAllEmpl = function () {
  connection.query("SELECT * FROM employees;", function (err, data) {
    if (err) { return res.status(500).end() }
    console.log('-----------------------------');
    console.table(data);
  });
  initialQues();
};

////////////ADD FUNC////////////////////////////////////////////////////////////////////////

var addEmpl = function () {
  inquirer.prompt(addEmplQues).then(addEmplAns => {
    console.log(addEmplAns.addLast);
    console.log(addEmplAns.addFirst);
    let firstLastNameArray = [addEmplAns.addFirst, addEmplAns.addLast];
    connection.query('INSERT INTO employees (firstName, lastName) VALUES(?);', [firstLastNameArray], (err) => {
      if (err) throw err;
    });
  });
  viewAllEmpl();

  initialQues();
};

var addRole = function () {
  inquirer.prompt(addRoleQues).then(addRoleAns => {
    let roleArray = [addRoleAns.title, addRoleAns.salary];
    connection.query('INSERT INTO roles (title, salary) VALUES(?);', [roleArray], (err) => {
      if (err) throw err;
    });
  });
  viewRole();

  initialQues();
};

var addDept = function () {
  inquirer.prompt(addDeptQues).then(addDeptAns => {
    let deptArray = [addDeptAns.dept];
    connection.query('INSERT INTO departments (deptName) VALUES(?);', [deptArray], (err) => {
      if (err) throw err;
    });
  });
  viewDept();

  initialQues();
};


////////////INITIAL QUES////////////////////////////////////////////////////////////////////////

var initialQues = function () {
  inquirer.prompt(iniQues).then(iniAns => {
    // console.log(iniAns);
    switch (iniAns.iniQuestion) {
      case 'add department': addDept();
        break;
      case 'add role': addRole();
        break;
      case 'add employee': addEmpl();
        break;
      case 'view departments': viewDept();
        break;
      case 'view roles': viewRole();
        break;
      case 'view employees': viewAllEmpl();
        break;
      case 'update role': updateRole();
        break;
    }
  });
};

initialQues();

// Create a new movie
// var addDept = function () {
//   app.post("/api/movies", function (req, res) {
//     connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function (err, result) {
//       if (err) {
//         return res.status(500).end();
//       }

//       // Send back the ID of the new movie
//       res.json({ id: result.insertId });
//       console.log({ id: result.insertId });
//     });
//   });
// };

// Retrieve all movies


// Update a movie
// app.put("/api/movies/:id", function (req, res) {
//   connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function (err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.changedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });

// // Delete a movie
// app.delete("/api/movies/:id", function (req, res) {
//   connection.query("DELETE FROM movies WHERE id = ?", [req.params.id], function (err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.affectedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();

//   });
// });







