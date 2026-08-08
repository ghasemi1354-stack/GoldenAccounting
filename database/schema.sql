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