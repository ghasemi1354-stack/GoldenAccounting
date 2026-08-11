import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";



export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>
  }
) {


  const { id } = await context.params;



  const result = await sql`

    SELECT

      p.*,

      c.name AS category_name,

      u.name AS unit_name


    FROM products p


    LEFT JOIN categories c
    ON c.id = p.category_id


    LEFT JOIN units u
    ON u.id = p.unit_id



    WHERE p.id = ${Number(id)}

  `;



  if(result.length === 0){

    return NextResponse.json(
      {
        error:"Product not found"
      },
      {
        status:404
      }
    );

  }



  return NextResponse.json(
    result[0]
  );

}






export async function PUT(
  req: NextRequest,
  context:{
    params: Promise<{id:string}>
  }
){


  const {id}=await context.params;



  const body = await req.json();



  const {

    code,

    barcode,

    name,

    category_id,

    unit_id,

    purchase_price,

    sale_price,

    is_active


  } = body;





  const result = await sql`


    UPDATE products


    SET

      code=${code},

      barcode=${barcode},

      name=${name},

      category_id=${category_id},

      unit_id=${unit_id},

      purchase_price=${purchase_price},

      sale_price=${sale_price},

      is_active=${is_active}



    WHERE id=${Number(id)}



    RETURNING *



  `;



  return NextResponse.json(
    result[0]
  );

}