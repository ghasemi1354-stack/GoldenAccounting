import Link from "next/link";

import {
  getProducts,
  getProductStats
} from "@/lib/queries/products";

import ProductStats from "@/components/products/ProductStats";
import ProductTable from "@/components/products/ProductTable";
import ProductSearch from "@/components/products/ProductSearch";



export default async function ProductsPage({

  searchParams,

}: {

  searchParams: Promise<{
    search?: string;
  }>;

}) {



  const params = await searchParams;



  const search =
    params.search || "";



  const products =
    await getProducts(search);



  const stats =
    await getProductStats();





  return (

    <div className="space-y-8">



      {/* Header */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-6
        flex
        justify-between
        items-center
      ">



        <div>


          <h1 className="
            text-3xl
            font-bold
            text-gray-800
          ">

            مدیریت کالاها

          </h1>



          <p className="
            text-gray-500
            mt-2
          ">

            ثبت، ویرایش و مدیریت اطلاعات کالاهای سیستم

          </p>


        </div>





        <Link

          href="/dashboard/products/new"

          className="
            bg-blue-600
            hover:bg-blue-700
            shadow-md
            shadow-blue-200
            text-white
            px-6
            py-3
            rounded-xl
            transition-all
            duration-200
            flex
            items-center
            gap-2
          "

        >

          <span className="text-xl">
            +
          </span>

          ثبت کالای جدید


        </Link>



      </div>






      {/* Search */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-5
      ">


        <ProductSearch />


      </div>






      {/* Stats */}

      <ProductStats

        stats={stats}

      />







      {/* Table */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        overflow-hidden
      ">


        <ProductTable

          products={products}

        />


      </div>





    </div>

  );

}