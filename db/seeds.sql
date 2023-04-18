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
    ('VP of Sales', 300000, 1),
    ('VP of Engineering', 300000, 2),
    ('VP of Finance', 300000, 3),
    ('VP of Legal', 300000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Samantha', 'Johnson', 1, 2),
    ('Tyler', 'Smith', 2, 1),
    ('Emily', 'Davis', 3, 4),
    ('Ryan', 'Wilson', 4, 3),
    ('Lila', 'Brown', 5, 3),
    ('Oliver', 'Taylor', 6, 3),
    ('Chloe', 'Garcia', 7, 3),
    ('Noah', 'Thomas', 8, 4),
    ('Avery', 'Robinson', 9, 4),
    ('Carter', 'Lopez', 10, 5),
    ('Audrey', 'Perez', 11, 5),
    ('Lucas', 'Jackson', 12, 6),
    ('Bella', 'Martinez', 13, 6),
    ('Wyatt', 'Gonzalez', 14, 7),
    ('Victoria', 'Nelson', 15, 7);