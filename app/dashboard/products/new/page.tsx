import { getCategories } from "@/lib/queries/categories";
import { getUnits } from "@/lib/queries/units";
import ProductForm from "./ProductForm";


export default async function NewProductPage() {

  const categories = await getCategories();
  const units = await getUnits();


  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        افزودن کالا
      </h1>


      <ProductForm
        categories={categories}
        units={units}
      />


    </div>

  );

}