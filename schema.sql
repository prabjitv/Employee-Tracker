DROP DATABASE IF EXISTS empTrackDB;
CREATE DATABASE empTrackDB;
USE empTrackDB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR(45) NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45) NULL,
  salary DECIMAL NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(45) NULL,
  lastName VARCHAR(45) NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
  );

