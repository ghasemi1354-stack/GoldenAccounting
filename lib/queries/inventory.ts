import sql from "@/lib/db";



export async function getInventory() {


  const inventory = await sql`

    SELECT

      p.id,

      p.code,

      p.barcode,

      p.name,


      u.name AS unit_name,


      p.minimum_stock,

      p.reorder_point,

      p.critical_stock,


      COALESCE(stock.stock_quantity,0) AS stock



    FROM products p



    LEFT JOIN units u

      ON u.id = p.unit_id




    LEFT JOIN (


      SELECT


        product_id,


        SUM(

          CASE


            WHEN transaction_type = 'IN'

            THEN quantity



            WHEN transaction_type = 'OUT'

            THEN -quantity



            ELSE 0


          END

        ) AS stock_quantity



      FROM warehouse_transactions



      GROUP BY product_id



    ) stock



    ON stock.product_id = p.id



    ORDER BY p.id DESC


  `;



  return inventory;

}






export async function getInventoryStats() {


  const result = await sql`

    SELECT


      COUNT(*)::int AS total,



      COUNT(*) FILTER (

        WHERE

        COALESCE(stock.stock_quantity,0)

        <=

        p.critical_stock

      )::int AS critical,



      COUNT(*) FILTER (

        WHERE

        COALESCE(stock.stock_quantity,0)

        <=

        p.reorder_point


        AND


        COALESCE(stock.stock_quantity,0)

        >

        p.critical_stock

      )::int AS reorder



    FROM products p



    LEFT JOIN (


      SELECT


        product_id,


        SUM(

          CASE


            WHEN transaction_type = 'IN'

            THEN quantity



            WHEN transaction_type = 'OUT'

            THEN -quantity



            ELSE 0


          END

        ) AS stock_quantity



      FROM warehouse_transactions



      GROUP BY product_id



    ) stock



    ON stock.product_id = p.id


  `;



  return result[0];

}