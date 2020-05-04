const inquirer = require("inquirer");
const cTable = console.table;
let mysql = require("mysql");

////////////MYSQL////////////////////////////////////////////////////////////////////////


let connection = mysql.createConnection({
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
  // console.log("connected as id " + connection.threadId);
});

////////////QUESTIONS///////////////////////////////////////////////////////////////////////

let iniQues = [
  {
    type: 'list',
    name: 'iniQuestion',
    message: 'What would you like to do?',
    choices: ['add department', 'add role', 'add employee', 'view departments', 'view roles', 'view employees', 'update role', 'EXIT']
  }
];

let addEmplQues = [
  { name: 'addFirst', message: 'Employee first name: ' },
  { name: 'addLast', message: 'Employee last name: ' }
];

let addRoleQues = [
  { name: 'title', message: 'Role Title: ' },
  { name: 'salary', message: 'Role Salary: ' }
];

let addDeptQues = [
  { name: 'dept', message: 'Name of New Department: ' },
];

////////////GET FUNC///////////////////////////////////////////////////////////////////

// let getDept = function () {
//   connection.query("SELECT deptName FROM departments;", function (err, data) {
//     if (err) { return res.status(500).end() }
//     var deptArray = [];
//     for (var i = 0; i < data.length; i++) {
//       deptArray.push(data[i].name);
//     };
//     // console.log(deptArray);
//     return deptArray;
//   });
// };

let getRole = function () {
  connection.query("SELECT title FROM roles;", function (err, data) {
    if (err) { return res.status(500).end() }
    var roleArray = [];
    for (var i = 0; i < data.length; i++) {
      roleArray.push(data[i].title);
    };
    // console.log(deptArray);
  });
};

let getEmpl = function () {
  connection.query("SELECT CONCAT (employees.firstName, ' ', employees.lastName) AS full_name FROM employees;", function (err, data) {
    if (err) { return res.status(500).end() }
    var emplArray = [];
    for (var i = 0; i < data.length; i++) {
      emplArray.push(data[i].title);
    };
    // console.log(deptArray);
  });
};

////////////VIEW FUNC///////////////////////////////////////////////////////////////////

let viewDept = function () {
  connection.query("SELECT * FROM departments;", function (err, data) {
    if (err) { return res.status(500).end() }
    console.log('-----------------------------');
    console.table(data);
    console.log('\n');
    initialQues();
    console.log('\n');

  });
};

let viewRole = function () {
  connection.query("SELECT * FROM roles;", function (err, data) {
    if (err) { return res.status(500).end() }
    console.log('-----------------------------');
    console.table(data);
    console.log('\n');
    initialQues();
    console.log('\n');
  });
};

let viewAllEmpl = function () {
  connection.query("SELECT * FROM employees;", function (err, data) {
    if (err) { return res.status(500).end() }
    console.log('-----------------------------');
    console.table(data);
    console.log('\n');
    initialQues();
    console.log('\n');
  });
};

////////////ADD FUNC////////////////////////////////////////////////////////////////////////

let addEmpl = function () {
  inquirer.prompt(addEmplQues).then(addEmplAns => {
    console.log(addEmplAns.addLast);
    console.log(addEmplAns.addFirst);
    let firstLastNameArray = [addEmplAns.addFirst, addEmplAns.addLast];
    connection.query('INSERT INTO employees (firstName, lastName) VALUES(?);', [firstLastNameArray], (err) => {
      if (err) throw err;
    });
  });
  console.log('\n');
  console.log('\n');
  console.log('\n');
  console.log('\n');
  console.log('\n');
  viewAllEmpl();
  console.log('\n');
  console.log('\n');
  console.log('\n');
  console.log('\n');
  console.log('\n');
  initialQues();
};

let addRole = function () {
  inquirer.prompt(addRoleQues).then(addRoleAns => {
    let roleArray = [addRoleAns.title, addRoleAns.salary];
    connection.query('INSERT INTO roles (title, salary) VALUES(?);', [roleArray], (err) => {
      if (err) throw err;
    });
  });
  console.log('\n');
  viewRole();
  console.log('\n');
  initialQues();
};

let addDept = function () {
  inquirer.prompt(addDeptQues).then(addDeptAns => {
    let deptArray = [addDeptAns.dept];
    connection.query('INSERT INTO departments (deptName) VALUES(?);', [deptArray], (err) => {
      if (err) throw err;
    });
  });
  console.log('\n');
  viewDept();
  console.log('\n');
  initialQues();
};

////////////UPDATE ROLE//////////////////////////////////////////////////////////////////////

let updateRole = function () {
  getEmpl(function (emplArray) {
    console.log('hi');
    console.log(emplArray);
    var emplList = emplArray;
    console.log(emplList);
    getRole(function (roleArray) {
      var roleList = roleArray;

      inquirer.prompt([

        { name: 'emplID', type: 'list', message: 'Select Employee to update: ', choices: emplList },
        { name: 'roleID', type: 'list', message: 'Select Role to assign: ', choices: roleList },

      ]).then(updateRoleAns => {
        var firstName = updateRoleAns.name.split(' ').slice(0, -1).join(' ');
        var lastName = updateRoleAns.name.split(' ').slice(-1).join(' ');
        connection.query('SELECT id FROM roles WHERE ?;', { roleID: updateRoleAns.roleID }, function (err, data) {
          if (err) throw err;
          connection.query('UPDATE employees SET ? WHERE ? AND ?;', [{ role_id: data[0].id }, { firstName: firstName }, { lastName: lastName }], (err) => {
            if (err) throw err;
            console.log(updateRoleAns.name + "'s role updated to " + updateRoleAns.title);
            console.log("----------------------------------------------");
            // initialQues();
          });


        })
      });

    });
  });
};

// connection.query("UPDATE movies SET movie = ? WHERE id = ?", [req.body.movie, req.params.id], function (err, result) {
//     if (err) {
//       // If an error occurred, send a generic server failure
//       return res.status(500).end();
//     }
//     else if (result.changedRows === 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     }
//     res.status(200).end();




////////////INITIAL QUES////////////////////////////////////////////////////////////////////////

let initialQues = function () {
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
      case 'EXIT':
        console.log('Thanks for visiting...');
        connection.end();
        console.log('Application ended.')
        return;
    }
  });
};

initialQues();

// Create a new movie
// let addDept = function () {
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







