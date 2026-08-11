import EditProductForm
from "@/components/products/EditProductForm";



export default async function EditProductPage({

params

}:{

params:{
id:string
}

}){



return (

<div>


<h1 className="
text-3xl
font-bold
mb-6
">

ویرایش کالا

</h1>



<EditProductForm

id={params.id}

/>


</div>

);

}