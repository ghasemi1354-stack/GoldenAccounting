import sql from "@/lib/db";


export async function getInventory() {

  const inventory = await sql`

    SELECT

      p.id,
      p.name AS product_name,

      w.name AS warehouse_name,

      SUM(
        CASE
          WHEN wt.transaction_type = 'IN'
          THEN wt.quantity

          WHEN wt.transaction_type = 'OUT'
          THEN -wt.quantity

          ELSE 0

        END
      ) AS quantity


    FROM warehouse_transactions wt


    INNER JOIN products p
      ON wt.product_id = p.id


    INNER JOIN warehouses w
      ON wt.warehouse_id = w.id


    GROUP BY
      p.id,
      p.name,
      w.name


    ORDER BY
      p.name;

  `;


  return inventory;

}