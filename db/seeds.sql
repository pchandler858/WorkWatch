USE employee_tracker

INSERT INTO departments (department_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (job_title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Accountant', 220000, 3),
    ('Accountant Manager', 250000, 3),
    ('Software Engineer Manager', 200000, 2),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 180000, 2),
    ('Sales Manager', 160000, 1),
    ('Legal Team Lead', 140000, 4),
    ('Lawyer', 120000, 4),
    ('CEO', 350000, 1),
    ('CFO', 300000, 3),
    ('CTO', 300000, 2),
    ('COO', 300000, 1),
    ('VP of Sales', 225000, 1),
    ('VP of Engineering', 250000, 2),
    ('VP of Finance', 275000, 3),
    ('VP of Legal', 245000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Samantha', 'Johnson', 1, 8),
    ('Tyler', 'Smith', 2, 8),
    ('Emily', 'Davis', 3, 4),
    ('Ryan', 'Wilson', 4, 3),
    ('Lila', 'Brown', 5, 13),
    ('Oliver', 'Taylor', 6, 5),
    ('Chloe', 'Garcia', 7, 5),
    ('Noah', 'Thomas', 8, 11),
    ('Avery', 'Robinson', 9, 10),
    ('Carter', 'Lopez', 10, NULL),
    ('Audrey', 'Perez', 11, NULL),
    ('Lucas', 'Jackson', 12, NULL),
    ('Bella', 'Martinez', 13, NULL),
    ('Wyatt', 'Gonzalez', 14, NULL),
    ('Victoria', 'Nelson', 15, 11);