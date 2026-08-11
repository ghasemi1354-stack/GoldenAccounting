export default function DashboardPage() {

return (

<div className="space-y-6">


  <div className="bg-white p-8 rounded-xl shadow">

    <h1 className="text-3xl font-bold mb-3">
      Golden Accounting
    </h1>


    <p className="text-gray-600">
      داشبورد سیستم حسابداری و انبارداری
    </p>

  </div>



  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">


    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        تعداد کاربران
      </h3>

      <p className="text-3xl font-bold mt-3">
        -
      </p>

    </div>



    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        تعداد کالاها
      </h3>

      <p className="text-3xl font-bold mt-3">
        -
      </p>

    </div>



    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        موجودی انبار
      </h3>

      <p className="text-3xl font-bold mt-3">
        -
      </p>

    </div>



    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500">
        فروش امروز
      </h3>

      <p className="text-3xl font-bold mt-3">
        -
      </p>

    </div>


  </div>



</div>

);

}