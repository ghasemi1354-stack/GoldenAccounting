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