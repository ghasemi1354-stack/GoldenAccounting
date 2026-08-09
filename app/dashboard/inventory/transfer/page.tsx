import TransferForm from "./TransferForm";
import sql from "@/lib/db";


async function getProducts(){

  const products = await sql`

    SELECT
      id,
      name

    FROM products

    WHERE is_active = true

    ORDER BY name

  `;

  return products;

}



async function getWarehouses(){

  const warehouses = await sql`

    SELECT
      id,
      name

    FROM warehouses

    ORDER BY name

  `;

  return warehouses;

}



export default async function TransferPage(){


  const products = await getProducts();

  const warehouses = await getWarehouses();



  return (

    <div>


      <h1 className="text-2xl font-bold mb-6">

        انتقال کالا بین انبارها

      </h1>



      <TransferForm

        products={products}

        warehouses={warehouses}

      />


    </div>

  );

}