"use client"

import {
useEffect,
useState
} from "react"

import {
supabase
} from "@/lib/supabase"

import Reveal from "./Reveal"


interface Wish {

id:string

message:string

attendance:string

created_at:string

guestName:string

}



export default function Wishes(){


const [wishes,setWishes]=useState<Wish[]>([])



async function getWishes(){


const {
data,
error
}=await supabase

.from("rsvps")

.select(`
id,
message,
attendance,
created_at,
guest_id
`)

.order(
"created_at",
{
ascending:false
}
)



if(error){

console.log(error)
return

}



const finalData = await Promise.all(

data.map(async(item)=>{


let guestName="Tamu"


if(item.guest_id){


const {
data:guest
}=await supabase

.from("guests")

.select("name")

.eq(
"id",
item.guest_id
)

.single()



if(guest){

guestName=guest.name

}


}



return {


id:item.id,

message:item.message,

attendance:item.attendance,

created_at:item.created_at,

guestName


}


})

)



console.log(
"FINAL DATA:",
finalData
)



setWishes(finalData)


}






useEffect(()=>{


const init=async()=>{

await getWishes()

}


init()



const channel = supabase

.channel(
"realtime-wishes"
)



.on(

"postgres_changes",

{

event:"INSERT",

schema:"public",

table:"rsvps"

},


()=>{


getWishes()


}


)


.subscribe()



return()=>{


supabase.removeChannel(
channel
)


}



},[])






return(


<section

className="
py-32
bg-[#faf8f5]
"

>



<div

className="
text-center
mb-16
px-6
"

>


<Reveal>


<h2

className="
font-serif
text-4xl
md:text-5xl
"

>

Wedding Wishes

</h2>



<p

className="
mt-4
text-gray-500
"

>

Doa dan ucapan dari keluarga serta sahabat

</p>


</Reveal>


</div>







<div

className="
max-w-3xl
mx-auto
space-y-6
px-6
"

>


{


wishes.map(

(wish,index)=>(


<Reveal

key={wish.id}

delay={
index < 5
?
index * 0.12
:
0
}

>


<div

className="
bg-[#fffdf8]
border
border-[#d8c8ad]
rounded-xl
shadow-[0_10px_40px_rgba(0,0,0,0.08)]
p-8
relative
"

>


<div

className="
absolute
top-3
left-3
w-5
h-5
border-t
border-l
border-[#c9ae7d]
"

/>



<h3

className="
font-serif
text-2xl
"

>

{

wish.guestName

}


</h3>



<p

className="
text-sm
text-gray-400
mt-1
"

>

{wish.attendance}

</p>




<p

className="
mt-5
text-gray-600
italic
leading-relaxed
"

>

{wish.message}

</p>




<p

className="
mt-5
text-xs
text-gray-400
"

>

{

new Date(
wish.created_at
)

.toLocaleDateString(

"id-ID",

{

day:"numeric",

month:"long",

year:"numeric"

}

)

}


</p>




</div>


</Reveal>


)


)



}





{

wishes.length===0 && (


<Reveal>

<p

className="
text-center
text-gray-400
"

>

Belum ada ucapan.

Jadilah yang pertama memberikan doa.

</p>


</Reveal>


)


}




</div>


</section>


)

}