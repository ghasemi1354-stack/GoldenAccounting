import sql from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      product_id,
      warehouse_id,
      quantity
    } = body;


    if (!product_id || !warehouse_id || !quantity) {

      return NextResponse.json(
        {
          error: "اطلاعات ناقص است"
        },
        {
          status:400
        }
      );

    }


    await sql`

      INSERT INTO warehouse_transactions
      (
        product_id,
        warehouse_id,
        transaction_type,
        quantity
      )

      VALUES

      (
        ${product_id},
        ${warehouse_id},
        'IN',
        ${quantity}
      )

    `;


    return NextResponse.json(
      {
        message:"Inventory entry created"
      },
      {
        status:201
      }
    );


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        error:"Database error"
      },
      {
        status:500
      }
    );

  }

}