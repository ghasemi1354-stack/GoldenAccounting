import sql from "@/lib/db";


export async function getProducts(search = "") {


const products = await sql`

SELECT

  p.id,
  p.code,
  p.barcode,
  p.name,

  c.name AS category_name,

  u.name AS unit_name,

  p.purchase_price,
  p.sale_price,

  p.is_active,

  p.created_at


FROM products p


LEFT JOIN categories c

ON c.id = p.category_id


LEFT JOIN units u

ON u.id = p.unit_id



WHERE

(
  ${search} = ''

  OR

  p.name ILIKE ${"%" + search + "%"}

  OR

  p.code ILIKE ${"%" + search + "%"}

  OR

  p.barcode ILIKE ${"%" + search + "%"}

)



ORDER BY p.id DESC


`;



return products;

}






export async function getCategories(){


const categories = await sql`

SELECT

 id,

 name

FROM categories

ORDER BY name

`;

return categories;

}






export async function getUnits(){


const units = await sql`

SELECT

 id,

 name

FROM units

ORDER BY name

`;

return units;

}







export async function getProduct(id:number){


const products = await sql`

SELECT

p.id,

p.code,

p.barcode,

p.name,

p.category_id,

p.unit_id,

p.purchase_price,

p.sale_price,

p.is_active,

p.created_at,


c.name AS category_name,

u.name AS unit_name



FROM products p


LEFT JOIN categories c

ON c.id=p.category_id


LEFT JOIN units u

ON u.id=p.unit_id



WHERE p.id=${id}


LIMIT 1

`;



return products[0] ?? null;

}







export async function getProductStats(){


const result = await sql`

SELECT


COUNT(*)::int AS total,


COUNT(*) FILTER(
WHERE is_active=true
)::int AS active,


COUNT(*) FILTER(
WHERE is_active=false
)::int AS inactive



FROM products


`;



return result[0];

}