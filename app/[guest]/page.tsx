import WeddingPage from "@/components/WeddingPage"

import { supabase } from "@/lib/supabase"



export default async function GuestPage({

params

}:{

params:Promise<{
guest:string
}>

}){


const {guest}=await params



const {data,error}=await supabase

.from("guests")

.select("name")

.eq("slug",guest)

.single()



if(error || !data){


return (

<div

className="
min-h-screen
flex
items-center
justify-center
"

>

<h1>

Undangan tidak ditemukan

</h1>

</div>

)

}



return (

<WeddingPage

guestName={data.name}

/>

)

}