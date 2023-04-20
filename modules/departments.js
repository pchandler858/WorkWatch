const inquirer = require("inquirer");
const connection = require("../config/connection");

// View all departments
viewAllDepartments = (start) => {
  const queryAll = `SELECT departments.id AS ID, departments.department_name AS Department FROM departments ORDER BY departments.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Add department
const addDepartment = (start) => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(
      (body = (answer) => {
        const queryAdd = `INSERT INTO departments (department_name) VALUES ('${answer.department}')`;
        const params = [body.department];
        connection.query(queryAdd, params, (err, res) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          console.log("\x1b[33m%s\x1b[0m", "\nDepartment added!\n");
          viewAllDepartments(start);
        });
      })
    );
};

module.exports = { viewAllDepartments, addDepartment };
