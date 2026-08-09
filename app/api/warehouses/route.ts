import sql from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      name,
      description
    } = body;


    if (!name) {
      return NextResponse.json(
        {
          error: "نام انبار الزامی است"
        },
        {
          status: 400
        }
      );
    }


    await sql`
      INSERT INTO warehouses
      (
        name,
        description
      )
      VALUES
      (
        ${name},
        ${description}
      )
    `;


    return NextResponse.json(
      {
        message: "Warehouse created"
      },
      {
        status: 201
      }
    );


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Database error"
      },
      {
        status: 500
      }
    );

  }

}