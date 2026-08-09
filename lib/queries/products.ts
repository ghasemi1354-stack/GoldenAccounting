import sql from "@/lib/db";

export async function getProducts() {
  const products = await sql`
    SELECT
      p.id,
      p.code,
      p.barcode,
      p.name,
      p.purchase_price,
      p.sale_price,
      p.is_active,
      c.name AS category_name,
      u.name AS unit_name
    FROM products p
    LEFT JOIN categories c
      ON p.category_id = c.id
    LEFT JOIN units u
      ON p.unit_id = u.id
    ORDER BY p.id DESC
  `;

  return products;
}