-- =========================================
-- GoldenAccounting Database Schema
-- Migration 001
-- Users & Roles
-- =========================================


-- حذف در صورت وجود (برای تست‌های اولیه)
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;


-- =========================================
-- Roles
-- =========================================

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- Users
-- =========================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    full_name VARCHAR(150),

    role_id INTEGER NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
);


-- =========================================
-- Default Roles
-- =========================================

INSERT INTO roles (name, description)
VALUES
('ADMIN', 'مدیر سیستم'),
('ACCOUNTANT', 'حسابدار'),
('SELLER', 'فروشنده'),
('WAREHOUSE', 'انباردار');
-- =========================================
-- GoldenAccounting
-- Migration 002
-- Product & Warehouse Base
-- =========================================


-- =========================================
-- Categories
-- =========================================

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- Units
-- =========================================

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- Products
-- =========================================

CREATE TABLE products (
    id SERIAL PRIMARY KEY,

    code VARCHAR(50) UNIQUE,
    barcode VARCHAR(100) UNIQUE,

    name VARCHAR(200) NOT NULL,

    category_id INTEGER,
    unit_id INTEGER,

    purchase_price NUMERIC(12,2) DEFAULT 0,
    sale_price NUMERIC(12,2) DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id),

    CONSTRAINT fk_product_unit
        FOREIGN KEY(unit_id)
        REFERENCES units(id)
);


-- =========================================
-- Warehouses
-- =========================================

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- Warehouse Transactions
-- =========================================

CREATE TABLE warehouse_transactions (
    id SERIAL PRIMARY KEY,

    product_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,

    transaction_type VARCHAR(20) NOT NULL,
    -- IN  : ورود
    -- OUT : خروج

    quantity NUMERIC(12,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_transaction_product
        FOREIGN KEY(product_id)
        REFERENCES products(id),

    CONSTRAINT fk_transaction_warehouse
        FOREIGN KEY(warehouse_id)
        REFERENCES warehouses(id)
);