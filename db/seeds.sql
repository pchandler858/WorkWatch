USE employee_tracker

INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (job_title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Accountant', 220000, 3),
    ('Accountant Manager', 250000, 3),
    ('Software Engineer Manager', 200000, 2),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 180000, 2),
    ('Sales Manager', 160000, 3),
    ('Legal Team Lead', 140000, 4),
    ('Lawyer', 120000, 4);
    ('CEO', 350000, 1);
    ('CFO', 300000, 3);
    ('CTO', 300000, 2);
    ('COO', 300000, 1);
    ('VP of Sales', 300000, 1);
    ('VP of Engineering', 300000, 2);
    ('VP of Finance', 300000, 3);
    ('VP of Legal', 300000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 2),
    ('Jane', 'Doe', 2, 1),
    ('Bob', 'Doe', 3, 4),
    ('Bob', 'Smith', 4, 3),
    ('Bob', 'Smith', 5, 3),
    ('Bob', 'Smith', 6, 3),
    ('Bob', 'Smith', 7, 3);
