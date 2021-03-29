-- fo help \?
-- list database \l
-- create  database  CREATE DATABASE database_name;
-- list all tables \d


CREATE TABLE products
(
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE business (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    business_name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(50) NOT NULL,
    country_id INT  NULL,
    province_id  INT  NULL,
    city_id  INT  NULL,
    business_reg_date DATE  NULL,
    business_paid_date DATE  NULL,
    business_paid_plan DATE  NULL
);
CREATE TABLE business_appoint (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    business_name VARCHAR(50) NOT NULL,
    business_email VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(50) NOT NULL,
    phonenumber VARCHAR(50) NOT NULL
);

CREATE TABLE add_services (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    servicename VARCHAR(50) NOT NULL,
    servicecost VARCHAR(50) NOT NULL,
    servicetime VARCHAR(50) NOT NULL,
    business_id BIGINT NOT NULL REFERENCES business(id)
);



CREATE TABLE business (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    business_name VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(50) NOT NULL
);


CREATE TABLE week_time (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    business_id BIGINT NOT NULL REFERENCES business_appoint(id),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL ,
    day_name  VARCHAR(50) 
);

-- Users Table
CREATE TABLE uesrs (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200),
    cpassword VARCHAR(200), 
    UNIQUE (email)
);