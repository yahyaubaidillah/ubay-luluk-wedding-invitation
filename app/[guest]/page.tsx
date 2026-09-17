import type { Metadata } from "next"

import { supabase } from "@/lib/supabase"

import WeddingPage from "@/components/WeddingPage"



interface GuestPageProps {

  params: Promise<{
    guest:string
  }>

}




async function getGuest(guest:string){


  const {data,error}=await supabase

  .from("guests")

  .select("*")

  .eq("slug",guest)

  .single()



  if(error || !data){

    return null

  }


  return data

}





export async function generateMetadata({

params

}:GuestPageProps):Promise<Metadata>{



const {guest}=await params



const data=await getGuest(guest)



if(!data){


return {

title:
"Wedding Invitation",


description:
"Undangan Pernikahan"


}

}



return {


title:

`${data.name} | Ubay & Luluk Wedding Invitation`,



description:

`Kepada ${data.name}, kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia pernikahan Ubay & Luluk pada 02 Oktober 2026.`,




openGraph:{


title:

`${data.name} | Ubay & Luluk Wedding Invitation`,



description:

`Undangan Pernikahan Ubay & Luluk untuk ${data.name}.`,



images:[

{

url:
"/images/wedding-cover.jpg",

width:1200,

height:630,

alt:
"Ubay & Luluk Wedding Invitation"

}

],



locale:
"id_ID",



type:
"website"


},



twitter:{


card:
"summary_large_image",


title:

`${data.name} | Ubay & Luluk Wedding Invitation`,


images:[

"/images/wedding-cover.jpg"

]


},



robots:{


index:false,

follow:false


}


}



}








export default async function GuestPage({

params

}:GuestPageProps){



const {guest}=await params



const data=await getGuest(guest)



if(!data){


return (


<main

className="
min-h-screen
flex
items-center
justify-center
"


>


<h1

className="
text-xl
font-serif
"

>


Undangan tidak ditemukan


</h1>



</main>


)

}




return (


<WeddingPage


guestName={data.name}


guestId={data.id}


/>


)


}