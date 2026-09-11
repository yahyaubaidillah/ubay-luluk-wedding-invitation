"use client"


import {wedding} from "@/data/wedding"

import Reveal from "./Reveal"



export default function OurStory(){


return(


<section

id="story"

className="
relative
min-h-screen
py-32
bg-[#f8f5ef]
overflow-hidden
"

>


<div

className="
max-w-5xl
mx-auto
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
mb-24
"

>

Our Story

</h2>


</Reveal>






<div

className="
relative
"

>



{/* Timeline Line */}

<div

className="
absolute
left-4
md:left-1/2
top-0
bottom-0
w-[2px]
bg-neutral-300
"

 />







{

wedding.story?.map((item,index)=>(


<Reveal

key={`${item.year}-${index}`}

delay={index * 0.2}

>


<div

className={`

relative

mb-20

flex

md:items-center


${
index%2===0

?

"md:justify-start"

:

"md:justify-end"

}

`}

>




{/* Dot */}

<div

className="
absolute
left-[-5px]
md:left-1/2
md:-translate-x-1/2
w-4
h-4
rounded-full
bg-neutral-800
"

>

</div>






{/* Card */}

<div

className="
ml-10
md:ml-0
md:w-[42%]
bg-white
rounded-2xl
p-8
shadow-lg
"

>


<h3

className="
text-3xl
md:text-4xl
font-serif
"

>

{item.year}

</h3>




<h4

className="
mt-3
text-lg
md:text-xl
font-medium
"

>

{item.title}

</h4>




<p

className="
mt-4
text-gray-600
leading-relaxed
"

>

{item.description}

</p>



</div>



</div>


</Reveal>



))


}





</div>



</div>



</section>


)

}