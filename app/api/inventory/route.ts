import sql from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      product_id,
      warehouse_id,
      quantity,
      transaction_type
    } = body;


    if (!product_id || !warehouse_id || !quantity || !transaction_type) {

      return NextResponse.json(
        {
          error: "اطلاعات ناقص است"
        },
        {
          status: 400
        }
      );

    }


    if (!["IN", "OUT"].includes(transaction_type)) {

      return NextResponse.json(
        {
          error: "نوع تراکنش نامعتبر است"
        },
        {
          status: 400
        }
      );

    }


    if (transaction_type === "OUT") {


      const stock = await sql`

        SELECT

        COALESCE(
          SUM(
            CASE

            WHEN transaction_type = 'IN'
            THEN quantity

            WHEN transaction_type = 'OUT'
            THEN -quantity

            END
          ),0
        ) AS quantity


        FROM warehouse_transactions

        WHERE product_id = ${product_id}

        AND warehouse_id = ${warehouse_id}

      `;


      if (Number(stock[0].quantity) < Number(quantity)) {

        return NextResponse.json(
          {
            error:"موجودی کافی نیست"
          },
          {
            status:400
          }
        );

      }

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
        ${transaction_type},
        ${quantity}
      )

    `;


    return NextResponse.json(
      {
        message:"Inventory transaction created"
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