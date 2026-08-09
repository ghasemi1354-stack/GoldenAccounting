import sql from "@/lib/db";

export async function getWarehouses() {

  const warehouses = await sql`
    SELECT
      id,
      name,
      description,
      created_at
    FROM warehouses
    ORDER BY id DESC
  `;

  return warehouses;
}