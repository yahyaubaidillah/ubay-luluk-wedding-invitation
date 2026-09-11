"use client"


import {
wedding
} from "@/data/wedding"


import Reveal from "./Reveal"



export default function Couple(){


return(


<section

id="couple"

className="
min-h-screen
py-24
bg-[#faf8f5]
flex
items-center
justify-center
"

>


<div

className="
max-w-5xl
w-full
px-6
"

>



{/* Title */}

<Reveal>


<h2

className="
text-center
font-serif
text-4xl
md:text-5xl
mb-20
"

>

Our Couple

</h2>


</Reveal>





<div

className="
grid
md:grid-cols-2
gap-16
"

>





{/* Groom */}


<Reveal

delay={0.2}

>


<div

className="
text-center
"

>


<img

src={wedding.groom.photo}

alt={wedding.groom.name}

className="
w-64
md:w-72
h-96
object-cover
mx-auto
rounded-t-full
shadow-xl
"

/>



<h3

className="
mt-8
text-3xl
md:text-4xl
font-serif
"

>

{wedding.groom.name}

</h3>



<p

className="
mt-4
text-gray-600
"

>

{wedding.groom.parents}

</p>



</div>


</Reveal>







{/* Bride */}



<Reveal

delay={0.4}

>


<div

className="
text-center
"

>


<img

src={wedding.bride.photo}

alt={wedding.bride.name}

className="
w-64
md:w-72
h-96
object-cover
mx-auto
rounded-t-full
shadow-xl
"

/>



<h3

className="
mt-8
text-3xl
md:text-4xl
font-serif
"

>

{wedding.bride.name}

</h3>



<p

className="
mt-4
text-gray-600
"

>

{wedding.bride.parents}

</p>



</div>


</Reveal>





</div>



</div>



</section>


)

}