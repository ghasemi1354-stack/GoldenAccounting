import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth/session";
import sql from "@/lib/db";


export async function getCurrentUser() {


  const cookieStore = await cookies();


  const token = cookieStore.get(
    "golden_session"
  )?.value;



  if (!token) {

    return null;

  }



  try {


    const session = await verifySession(token);



    const users = await sql`

      SELECT

        u.id,
        u.username,
        u.full_name,
        u.role_id,

        r.name AS role_name

      FROM users u

      LEFT JOIN roles r

      ON u.role_id = r.id

      WHERE u.id=${session.id}

      LIMIT 1

    `;



    return users[0] ?? null;



  } catch(error) {


    return null;


  }


}