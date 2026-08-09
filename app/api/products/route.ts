import sql from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const body = await request.json();


    const {
      code,
      barcode,
      name,
      category_id,
      unit_id,
      purchase_price,
      sale_price
    } = body;


    const result = await sql`
      INSERT INTO products
      (
        code,
        barcode,
        name,
        category_id,
        unit_id,
        purchase_price,
        sale_price,
        is_active
      )
      VALUES
      (
        ${code},
        ${barcode},
        ${name},
        ${category_id},
        ${unit_id},
        ${purchase_price},
        ${sale_price},
        true
      )
      RETURNING *
    `;


    return NextResponse.json(result[0]);


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "خطا در ثبت کالا"
      },
      {
        status: 500
      }
    );

  }

}