"use client"


import {
MapPin,
Clock,
CalendarDays
} from "lucide-react"


import {
wedding
} from "@/data/wedding"


import type {
EventData
} from "@/data/wedding"


import Reveal from "./Reveal"




export default function EventDetail(){


return(


<section

id="event"

className="
min-h-screen
py-20
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



{/* Title */}

<Reveal>


<div

className="
text-center
mb-20
"

>


<h2

className="
text-4xl
md:text-5xl
font-serif
"

>

The Wedding Day

</h2>



<p

className="
mt-4
text-gray-500
leading-relaxed
"

>

Dengan penuh kebahagiaan kami mengundang Anda
untuk hadir di hari istimewa kami

</p>



</div>


</Reveal>








<div

className="
flex
justify-center
gap-8
flex-wrap
"

>



{

wedding.events.map(

(event:EventData,index)=>(


<Reveal

key={index}

delay={index*0.2}

>


<div

className="
w-full
md:w-[420px]
bg-white
rounded-3xl
p-8
md:p-10
shadow-xl
text-center
"

>


<h3

className="
font-serif
text-3xl
md:text-4xl
"

>

{event.type}

</h3>






<div

className="
mt-8
space-y-5
text-gray-600
"

>





<p

className="
flex
justify-center
gap-3
items-center
"

>


<CalendarDays

size={18}

/>


<span>

{event.date}

</span>


</p>







<p

className="
flex
justify-center
gap-3
items-center
"

>


<Clock

size={18}

/>


<span>

{event.time}

</span>


</p>








<p

className="
flex
justify-center
gap-3
items-center
"

>


<MapPin

size={18}

/>


<span>

{event.location}

</span>


</p>





</div>








<a


href={event.maps}


target="_blank"


rel="noopener noreferrer"


className="
inline-block
mt-8
rounded-full
px-8
py-3
bg-black
text-white
hover:scale-105
transition
"

>


Open Maps


</a>






</div>



</Reveal>



)


)


}




</div>






</div>



</section>


)

}