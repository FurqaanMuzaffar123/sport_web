CREATE DATABASE sports_web;

\connect sports_web;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phonenumber BIGINT,
    gender TEXT,
    age INT
);