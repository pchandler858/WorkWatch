USE employee_tracker

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 180000, 2),
    ('Accountant', 160000, 3),
    ('Legal Team Lead', 140000, 4),
    ('Lawyer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Bob', 'Doe', 3, NULL),
    ('Bob', 'Smith', 4, 3),
    ('Bob', 'Smith', 5, 3),
    ('Bob', 'Smith', 6, 3),
    ('Bob', 'Smith', 7, 3);
