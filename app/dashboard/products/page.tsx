import { getProducts } from "@/lib/queries/products";


export default async function ProductsPage() {

  const products = await getProducts();


  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        لیست کالاها
      </h1>


      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-100">

            <tr>
              <th className="p-3 text-right">
                کد
              </th>

              <th className="p-3 text-right">
                نام کالا
              </th>

              <th className="p-3 text-right">
                دسته‌بندی
              </th>

              <th className="p-3 text-right">
                قیمت خرید
              </th>

              <th className="p-3 text-right">
                قیمت فروش
              </th>

            </tr>

          </thead>


          <tbody>

          {products.map((product:any)=>(
            
            <tr key={product.id} className="border-t">

              <td className="p-3">
                {product.code}
              </td>

              <td className="p-3">
                {product.name}
              </td>

              <td className="p-3">
                {product.category_name}
              </td>

              <td className="p-3">
                {product.purchase_price}
              </td>

              <td className="p-3">
                {product.sale_price}
              </td>

            </tr>

          ))}

          </tbody>

        </table>

      </div>


    </div>
  );
}