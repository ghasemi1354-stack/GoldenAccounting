import sql from "@/lib/db";
import InventoryInForm from "./InventoryInForm";


async function getProducts(){

  return await sql`
    SELECT id,name
    FROM products
    WHERE is_active=true
    ORDER BY name
  `;

}


async function getWarehouses(){

  return await sql`
    SELECT id,name
    FROM warehouses
    ORDER BY name
  `;

}



export default async function InventoryInPage(){

  const products = await getProducts();

  const warehouses = await getWarehouses();


  return (

    <main className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        ثبت ورود کالا
      </h1>


      <InventoryInForm

        products={products}

        warehouses={warehouses}

      />

    </main>

  );

}