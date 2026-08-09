import dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});

import sql from "../lib/db";
import bcrypt from "bcrypt";

async function createAdmin() {
  const password = "Admin@123";

  const hash = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users
    (
      username,
      password_hash,
      full_name,
      role_id
    )
    VALUES
    (
      'admin',
      ${hash},
      'مدیر سیستم',
      1
    )
  `;

  console.log("Admin created");

  process.exit();
}

createAdmin();