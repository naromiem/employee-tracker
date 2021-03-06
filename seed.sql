
DROP DATABASE IF EXISTS employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role_info (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT(10) NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT(10) NULL,
    manager_id INT(10) NULL,
    PRIMARY KEY (id)
);


-- SELECT first_name, last_name, title, salary, dept_name FROM employee
-- INNER JOIN role_info ON employee.role_id = role_info.id
-- INNER JOIN department ON role_info.department_id = department.id;

SELECT * FROM department;
SELECT * FROM role_info;
SELECT * FROM employee;
