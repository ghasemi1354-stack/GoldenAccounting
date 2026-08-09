import sql from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      product_id,
      from_warehouse_id,
      to_warehouse_id,
      quantity
    } = body;


    if (
      !product_id ||
      !from_warehouse_id ||
      !to_warehouse_id ||
      !quantity
    ) {

      return NextResponse.json(
        {
          error:"اطلاعات ناقص است"
        },
        {
          status:400
        }
      );

    }


    if(from_warehouse_id === to_warehouse_id){

      return NextResponse.json(
        {
          error:"انبار مبدا و مقصد یکسان است"
        },
        {
          status:400
        }
      );

    }


    const stock = await sql`

      SELECT

      COALESCE(
        SUM(
          CASE

          WHEN transaction_type='IN'
          THEN quantity

          WHEN transaction_type='OUT'
          THEN -quantity

          END
        ),0
      ) AS quantity


      FROM warehouse_transactions

      WHERE product_id=${product_id}

      AND warehouse_id=${from_warehouse_id}

    `;



    if(Number(stock[0].quantity) < Number(quantity)){

      return NextResponse.json(
        {
          error:"موجودی انبار مبدا کافی نیست"
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
        ${from_warehouse_id},
        'OUT',
        ${quantity}
      )

    `;



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
        ${to_warehouse_id},
        'IN',
        ${quantity}
      )

    `;



    return NextResponse.json(
      {
        message:"Transfer completed"
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