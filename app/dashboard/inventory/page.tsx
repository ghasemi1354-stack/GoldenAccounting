import { getInventory } from "@/lib/queries/inventory";


export default async function InventoryPage(){

  const inventory = await getInventory();


  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        موجودی انبار
      </h1>


      <table className="w-full bg-white shadow rounded">

        <thead>

          <tr>

            <th className="p-3">
              کالا
            </th>

            <th className="p-3">
              انبار
            </th>

            <th className="p-3">
              موجودی
            </th>

          </tr>

        </thead>


        <tbody>


        {inventory.map((item:any)=>(

          <tr key={item.id}>

            <td className="p-3">
              {item.product_name}
            </td>


            <td className="p-3">
              {item.warehouse_name}
            </td>


            <td className="p-3">
              {item.quantity}
            </td>


          </tr>

        ))}


        </tbody>


      </table>


    </div>

  );

}