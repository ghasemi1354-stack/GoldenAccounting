import sql from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { requireApiPermission } from "@/lib/auth/apiGuard";


export async function POST(request: Request) {


try {


  const permission = await requireApiPermission(
    "users.create"
  );



  if(permission.error){

    return permission.error;

  }




  const body = await request.json();



  const {
    username,
    password,
    full_name,
    role_id
  } = body;





  if (
    !username ||
    !password ||
    !full_name ||
    !role_id
  ) {


    return NextResponse.json(
      {
        error:"اطلاعات کامل وارد نشده است"
      },
      {
        status:400
      }
    );


  }





  const existingUser = await sql`

    SELECT id

    FROM users

    WHERE username=${username}

  `;




  if(existingUser.length > 0){


    return NextResponse.json(
      {
        error:"این نام کاربری قبلا ثبت شده است"
      },
      {
        status:400
      }
    );


  }





  const passwordHash = await bcrypt.hash(
    password,
    10
  );





  await sql`

    INSERT INTO users
    (
      username,
      password_hash,
      full_name,
      role_id,
      is_active
    )

    VALUES
    (
      ${username},
      ${passwordHash},
      ${full_name},
      ${role_id},
      true
    )

  `;





  return NextResponse.json(
    {
      message:"User created"
    },
    {
      status:201
    }
  );



}
catch(error){


  console.error(error);



  return NextResponse.json(
    {
      error:"Server error"
    },
    {
      status:500
    }
  );


}


}