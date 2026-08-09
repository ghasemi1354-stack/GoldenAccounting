import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          message: "نام کاربری و رمز عبور الزامی است",
        },
        {
          status: 400,
        }
      );
    }

    const users = await sql`
      SELECT
        id,
        username,
        password_hash,
        full_name,
        role_id
      FROM users
      WHERE username = ${username}
      AND is_active = true
    `;

    if (users.length === 0) {
      return NextResponse.json(
        {
          message: "کاربر پیدا نشد",
        },
        {
          status: 401,
        }
      );
    }


    const user = users[0];


    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );


    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "رمز عبور اشتباه است",
        },
        {
          status: 401,
        }
      );
    }


    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role_id: user.role_id,
      },
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}