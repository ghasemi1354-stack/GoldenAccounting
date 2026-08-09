import sql from "@/lib/db";

export async function getCategories() {
  const categories = await sql`
    SELECT
      id,
      name
    FROM categories
    ORDER BY id
  `;

  return categories;
}