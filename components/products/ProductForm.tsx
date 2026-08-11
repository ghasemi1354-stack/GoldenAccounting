"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



type Product = {
  id: number;
  code: string;
  barcode: string | null;
  name: string;
  category_id: number;
  unit_id: number;
  purchase_price: number;
  sale_price: number;
  is_active: boolean;
};



export default function ProductForm({
  categories,
  units,
  product,
}: {
  categories: any[];
  units: any[];
  product?: Product;
}) {


  const router = useRouter();

  const isEdit = !!product;

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    setError("");



    const form = new FormData(e.currentTarget);



    const data = {

      code: String(form.get("code") || ""),

      barcode: String(form.get("barcode") || ""),

      name: String(form.get("name") || ""),

      category_id: Number(
        form.get("category_id")
      ),

      unit_id: Number(
        form.get("unit_id")
      ),

      purchase_price: Number(
        form.get("purchase_price") || 0
      ),

      sale_price: Number(
        form.get("sale_price") || 0
      ),

      is_active:
        form.get("is_active") === "true",

    };



    try {


      const url = isEdit
        ? `/api/products/${product.id}`
        : "/api/products";


      const method = isEdit
        ? "PATCH"
        : "POST";



      const res = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );



      const result = await res.json();



      if (!res.ok) {

        throw new Error(
          result.error ||
          "خطا در ذخیره کالا"
        );

      }



      router.push(
        "/dashboard/products"
      );

      router.refresh();



    } catch (err: any) {

      console.error(err);

      setError(
        err.message ||
        "خطا در ذخیره کالا"
      );

      setLoading(false);

    }

  }



  return (

    <form
      onSubmit={submit}
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-gray-200
        p-8
        space-y-6
      "
    >


      {error && (

        <div
          className="
            bg-red-50
            border
            border-red-200
            text-red-700
            rounded-xl
            p-4
          "
        >
          {error}
        </div>

      )}



      <div>

        <label className="block font-medium mb-2">
          کد کالا
        </label>

        <input
          name="code"
          defaultValue={product?.code ?? ""}
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          required
        />

      </div>



      <div>

        <label className="block font-medium mb-2">
          بارکد
        </label>

        <input
          name="barcode"
          defaultValue={product?.barcode ?? ""}
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>



      <div>

        <label className="block font-medium mb-2">
          نام کالا
        </label>

        <input
          name="name"
          defaultValue={product?.name ?? ""}
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          required
        />

      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


        <div>

          <label className="block font-medium mb-2">
            دسته‌بندی
          </label>

          <select
            name="category_id"
            defaultValue={
              product?.category_id ?? ""
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
              bg-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          >

            <option value="">
              انتخاب دسته‌بندی
            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>



        <div>

          <label className="block font-medium mb-2">
            واحد
          </label>

          <select
            name="unit_id"
            defaultValue={
              product?.unit_id ?? ""
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
              bg-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          >

            <option value="">
              انتخاب واحد
            </option>

            {units.map((unit) => (

              <option
                key={unit.id}
                value={unit.id}
              >
                {unit.name}
              </option>

            ))}

          </select>

        </div>


      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


        <div>

          <label className="block font-medium mb-2">
            قیمت خرید
          </label>

          <div className="relative">

            <input
              name="purchase_price"
              type="number"
              defaultValue={
                product?.purchase_price ?? 0
              }
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
                pl-20
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <span
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
                text-sm
              "
            >
              تومان
            </span>

          </div>

        </div>



        <div>

          <label className="block font-medium mb-2">
            قیمت فروش
          </label>

          <div className="relative">

            <input
              name="sale_price"
              type="number"
              defaultValue={
                product?.sale_price ?? 0
              }
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
                pl-20
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <span
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
                text-sm
              "
            >
              تومان
            </span>

          </div>

        </div>


      </div>



      {isEdit && (

        <div>

          <label className="block font-medium mb-2">
            وضعیت کالا
          </label>

          <select
            name="is_active"
            defaultValue={
              product?.is_active
                ? "true"
                : "false"
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-3
              bg-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >

            <option value="true">
              فعال
            </option>

            <option value="false">
              غیرفعال
            </option>

          </select>

        </div>

      )}



      <div className="flex justify-end gap-3 pt-4">


        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/products"
            )
          }
          className="
            px-6
            py-3
            rounded-xl
            border
            border-gray-300
            text-gray-700
            hover:bg-gray-50
          "
        >
          انصراف
        </button>



        <button
          type="submit"
          disabled={loading}
          className="
            px-6
            py-3
            rounded-xl
            bg-blue-600
            text-white
            font-medium
            hover:bg-blue-700
            disabled:opacity-50
            transition
          "
        >

          {loading
            ? "در حال ذخیره..."
            : isEdit
              ? "ذخیره تغییرات"
              : "ذخیره کالا"
          }

        </button>


      </div>


    </form>

  );
}