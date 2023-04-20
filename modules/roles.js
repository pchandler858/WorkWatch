const inquirer = require("inquirer");
const connection = require("../config/connection");

// View all roles
viewAllRoles = (start) => {
  const queryAll = `SELECT roles.id AS 'ID', roles.job_title AS 'Job Title', roles.salary AS "Salary", departments.department_name AS Department FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Add role
const addRole = (start) => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role?",
        },
        {
          name: "department",
          type: "list",
          message: "What is the department of the role?",
          choices: res.map((department) => ({
            name: department.department_name,
            value: department.id,
          })),
        },
      ])
      .then(
        (body = (answer) => {
          const queryAdd = `INSERT INTO roles (job_title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.department}')`;
          const params = [body.title, body.salary, body.department];
          connection.query(queryAdd, params, (err, res) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            console.log("Role added!");
            viewAllRoles(start);
          });
        })
      );
  });
};

module.exports = { viewAllRoles, addRole };
