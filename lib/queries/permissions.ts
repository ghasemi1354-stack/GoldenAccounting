import sql from "@/lib/db";


export async function getUserPermissions(
  userId: number
) {


  const permissions = await sql`

    SELECT

      p.name AS permission


    FROM users u


    INNER JOIN roles r

    ON u.role_id = r.id


    INNER JOIN role_permissions rp

    ON r.id = rp.role_id


    INNER JOIN permissions p

    ON rp.permission_id = p.id


    WHERE u.id = ${userId}


    ORDER BY p.name

  `;



  return permissions.map(
    (item:any) => item.permission
  );


}