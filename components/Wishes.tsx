"use client"


import {
useEffect,
useState
} from "react"


import {
supabase
} from "@/lib/supabase"


import Reveal from "./Reveal"



interface Wish{

id:string

name:string

message:string

attendance:string

created_at:string

}





export default function Wishes(){



const [wishes,setWishes]=useState<Wish[]>([])





async function getWishes(){


const {

data,

error

}=await supabase


.from("rsvps")

.select("*")

.order(

"created_at",

{

ascending:false

}

)



if(!error && data){


setWishes(

data as Wish[]

)


}



}







useEffect(()=>{


getWishes()



const channel =

supabase


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



(payload)=>{


const newWish =

payload.new as Wish



setWishes(

(current)=>[

newWish,

...current

]

)



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

bg-white

rounded-3xl

shadow-lg

p-8

"

>





<h3


className="

font-serif

text-2xl

"

>

{wish.name}

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

"{wish.message}"

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

"id-ID"

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