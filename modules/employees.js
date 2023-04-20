const inquirer = require("inquirer");
const connection = require("../config/connection");

// View all employees
viewAllEmployees = (start) => {
  const queryAll = `SELECT employees.id AS 'ID', employees.first_name AS 'First Name', employees.last_name as 'Last Name', roles.job_title AS 'Title', departments.department_name AS 'Department', roles.salary AS 'Salary', CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY employees.id`;
  connection.query(queryAll, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// Add employee
const addEmployee = (start) => {
  const queryAllRoles = `SELECT roles.id, roles.job_title FROM roles`;
  const queryAllManagers = `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title FROM employees LEFT JOIN roles ON employees.role_id = roles.id WHERE roles.job_title LIKE '%Manager%'`;

  connection.query(queryAllRoles, (err, resRoles) => {
    if (err) throw err;

    connection.query(queryAllManagers, (err, resManagers) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee?",
          },
          {
            name: "role",
            type: "list",
            pageSize: 15,
            message: "What is the role of the employee?",
            choices: resRoles.map((role) => ({
              name: role.job_title,
              value: role.id,
            })),
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the manager of the employee?",
            choices: resManagers.map((manager) => ({
              name: `${manager.first_name} ${manager.last_name}`,
              value: manager.id,
            })),
          },
        ])
        .then((answer) => {
          const queryAdd = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}', '${answer.manager}')`;

          connection.query(queryAdd, (err, res) => {
            if (err) throw err;
            console.log("Employee added!");
            viewAllEmployees(start);
          });
        });
    });
  });
};

// Update employee role
const updateEmployeeRole = (start) => {
  const queryAllEmployees = `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;
  const queryAllRoles = `SELECT roles.id, roles.job_title FROM roles`;

  connection.query(queryAllEmployees, (err, resEmployees) => {
    if (err) throw err;

    connection.query(queryAllRoles, (err, resRoles) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: resEmployees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            name: "role",
            type: "list",
            message: "What is the new role of the employee?",
            choices: resRoles.map((role) => ({
              name: role.job_title,
              value: role.id,
            })),
          },
        ])
        .then((answer) => {
          const queryUpdate = `UPDATE employees SET role_id = '${answer.role}' WHERE id = '${answer.employee}'`;

          connection.query(queryUpdate, (err, res) => {
            if (err) throw err;
            console.log("Employee role updated!");
            viewAllEmployees(start);
          });
        });
    });
  });
};

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };
