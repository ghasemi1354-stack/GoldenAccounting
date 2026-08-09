import sql from "@/lib/db";

export async function getUnits() {
  const units = await sql`
    SELECT
      id,
      name
    FROM units
    ORDER BY id
  `;

  return units;
}