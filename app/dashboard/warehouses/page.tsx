import { getWarehouses } from "@/lib/queries/warehouses";


export default async function WarehousesPage() {

  const warehouses = await getWarehouses();


  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        انبارها
      </h1>


      <a
        href="/dashboard/warehouses/new"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        افزودن انبار
      </a>


      <table className="w-full mt-6 bg-white shadow rounded">

        <thead>
          <tr>
            <th className="p-3 text-right">
              نام انبار
            </th>

            <th className="p-3 text-right">
              توضیحات
            </th>
          </tr>
        </thead>


        <tbody>

          {warehouses.map((item:any)=>(

            <tr key={item.id}>

              <td className="p-3">
                {item.name}
              </td>

              <td className="p-3">
                {item.description}
              </td>

            </tr>

          ))}

        </tbody>

      </table>


    </div>

  );
}