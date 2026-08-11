import Link from "next/link";

import ProductForm from "@/components/products/ProductForm";

import {
  getCategories,
  getUnits
} from "@/lib/queries/products";



export default async function NewProductPage(){



  const categories = await getCategories();


  const units = await getUnits();




  return (

    <div>



      <div className="mb-6 flex justify-between">


        <div>

          <h1 className="
          text-3xl
          font-bold
          text-gray-800
          ">

            افزودن کالا

          </h1>


          <p className="text-gray-500 mt-2">

            ثبت کالای جدید در سیستم

          </p>


        </div>




        <Link

          href="/dashboard/products"

          className="
          text-blue-600
          "

        >

          بازگشت

        </Link>


      </div>





      <ProductForm

        categories={categories}

        units={units}

      />



    </div>

  );


}