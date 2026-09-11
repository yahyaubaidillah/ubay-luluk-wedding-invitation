"use client"


import {useState} from "react"

import {motion} from "framer-motion"

import {Copy,Check} from "lucide-react"

import {wedding} from "@/data/wedding"



export default function Gift(){


const [copied,setCopied]=useState<string|null>(null)



async function copyAccount(account:string){

await navigator.clipboard.writeText(account)

setCopied(account)


setTimeout(()=>{

setCopied(null)

},2000)

}



return(

<section

id="gift"

className="
min-h-screen
py-32
bg-[#faf8f5]
"

>


<div

className="
max-w-5xl
mx-auto
px-6
"

>


<motion.h2

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
text-center
font-serif
text-5xl
"

>

Wedding Gift

</motion.h2>



<p

className="
text-center
mt-6
text-gray-600
"

>

Terima kasih atas doa dan perhatian
yang diberikan kepada kami.

</p>



<div

className="
mt-16
grid
md:grid-cols-2
gap-10
"

>


{

wedding.gift.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:50
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:index*0.2
}}

className="
bg-white
rounded-3xl
shadow-xl
p-10
text-center
border
border-neutral-100
hover:-translate-y-2
transition
duration-500
"

>


<img

src={item.logo}

alt={item.bank}

className="
h-12
mx-auto
mb-6
object-contain
"

/>


<h3

className="
font-serif
text-3xl
"

>

{item.bank}

</h3>



<p

className="
mt-6
text-gray-500
"

>

Atas Nama

</p>



<p

className="
text-xl
font-medium
"

>

{item.name}

</p>



<p

className="
mt-6
text-2xl
tracking-widest
"

>

{item.account}

</p>



<button

onClick={()=>copyAccount(item.account)}

className="
mt-8
inline-flex
items-center
gap-2
rounded-full
bg-black
text-white
px-8
py-3
"

>


{

copied===item.account

?

<>

<Check size={18}/>

Copied

</>

:

<>

<Copy size={18}/>

Copy Rekening

</>

}


</button>



</motion.div>


))

}


</div>


</div>


</section>


)

}