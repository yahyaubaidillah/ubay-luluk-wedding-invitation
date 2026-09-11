"use client"


import Image from "next/image"
import Reveal from "./Reveal"

import {
Eye
} from "lucide-react"


import {
wedding
} from "@/data/wedding"



export default function Gallery(){


return(


<section

id="gallery"

className="
min-h-screen
py-32
bg-white
"

>


<div

className="
max-w-6xl
mx-auto
px-6
"

>


{/* Title */}

<Reveal>


<div

className="
text-center
mb-16
"

>


<h2

className="
font-serif
text-4xl
md:text-5xl
"

>

Our Gallery

</h2>



<p

className="
mt-4
text-gray-500
"

>

Momen indah perjalanan kami

</p>


</div>


</Reveal>







<div

className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-5
"

>


{

wedding.gallery?.map((image,index)=>(


<Reveal

key={index}

delay={index*0.08}

>


<div

className="
relative
overflow-hidden
rounded-3xl
shadow-lg
group
cursor-pointer
"

>



<Image

src={image}

alt={`Wedding Gallery ${index+1}`}

width={800}

height={800}

sizes="
(max-width:768px) 50vw,
(max-width:1200px) 33vw,
25vw
"

loading="lazy"

draggable="false"

onContextMenu={(e)=>
e.preventDefault()
}

className="
w-full
aspect-square
object-cover
transition duration-700
group-hover:scale-110
"

/>





{/* Overlay */}


<div

className="
absolute
inset-0
bg-black/0
group-hover:bg-black/40
transition-all
duration-500
flex
items-center
justify-center
"

>



<div

className="
opacity-0
group-hover:opacity-100
transition-all
duration-500
scale-75
group-hover:scale-100
text-white
flex
flex-col
items-center
gap-2
"

>


<Eye

size={32}

/>



<span

className="
text-sm
tracking-widest
uppercase
"

>

View

</span>


</div>



</div>





{/* Corner glow */}


<div

className="
absolute
inset-0
rounded-3xl
ring-0
group-hover:ring-2
group-hover:ring-white/50
transition-all
duration-500
"

 />




</div>



</Reveal>



))


}



</div>





</div>


</section>


)

}