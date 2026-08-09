import sql from "@/lib/db";


export async function getUsers(){

  const users = await sql`

    SELECT

      u.id,
      u.username,
      u.full_name,
      u.is_active,
      u.created_at,

      r.name AS role_name

    FROM users u

    LEFT JOIN roles r

    ON u.role_id = r.id

    ORDER BY u.id DESC

  `;


  return users;

}



export async function getRoles(){

  const roles = await sql`

    SELECT

      id,
      name,
      description

    FROM roles

    ORDER BY id

  `;


  return roles;

}
export async function getUserById(id:number){

  const users = await sql`

    SELECT

      u.id,
      u.username,
      u.full_name,
      u.role_id,
      u.is_active,

      r.name AS role_name

    FROM users u

    LEFT JOIN roles r

    ON u.role_id = r.id

    WHERE u.id=${id}

  `;


  return users[0];

}
export async function updateUserStatus(
  id:number,
  status:boolean
){

  await sql`

    UPDATE users

    SET
      is_active=${status},
      updated_at=NOW()

    WHERE id=${id}

  `;

}