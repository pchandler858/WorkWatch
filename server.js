const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// function to view all departments
async function viewAllDepartments() {
  const [rows] = await pool.query("SELECT * FROM department");
  console.table(rows);
}

// view all roles
async function viewAllRoles() {
  const [rows] = await pool.query("SELECT * FROM role");
  console.table(rows);
}

// view all employees
async function viewAllEmployees() {
  const [rows] = await pool.query("SELECT * FROM employee");
  console.table(rows);
}

// add a department
async function addDepartment() {
  const [rows] = await pool.query("SELECT * FROM department");
  console.table(rows);
  const department = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department you would like to add?",
    },
  ]);
  await pool.query("INSERT INTO department SET ?", department);
  console.log("Added department");
}

// add a role
async function addRole() {
  const [rows] = await pool.query("SELECT * FROM role");
  console.table(rows);
  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role you would like to add?",
      validate: (title) => {
        if (title.trim() === "") {
          return "Title cannot be blank";
        }
        return true;
      },
    },
    {
      type: "number",
      name: "salary",
      message: "What is the salary of the role you would like to add?",
      validate: (salary) => {
        if (isNaN(salary)) {
          return "Salary must be a number";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department of the new role",
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);
  await pool.query("INSERT INTO role SET ?", role);
  console.log(`Added ${role.title} to the database`);
}
