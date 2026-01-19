--Création de base de données:
CREATE DATABASE leboncoin25;

--Création tables:
--table users:
CREATE TABLE users(
    id INT PRIMARY AUTO_INCREMENT,
    name VARCHAR(150),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    create_at TIMESTAMP
);

--table annonces:
CREATE TABLE annonces(
    id INT PRIMARY AUTO_INCREMENT,
    title VARCHAR(255) UNIQUE,
    image VARCHAR(255),
    description TEXT,
    categories_id INT,
    users_id INT,
    create_at TIMESTAMP
);

--table categories:
CREATE TABLE categories(
    id INTO PRIMARY AUTO_INCREMENT,
    nane VARCHAR(255)
);

