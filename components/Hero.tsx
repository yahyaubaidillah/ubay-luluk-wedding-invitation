"use client"

import Image from "next/image"
import {motion} from "framer-motion"

import Countdown from "./Countdown"
import FloatingPetals from "./FloatingPetals"


export default function Hero(){

return(

<section

className="
relative
min-h-screen
overflow-hidden
flex
items-center
justify-center
text-white
px-6
"

>


{/* Background */}

<motion.div

initial={{
scale:1
}}

animate={{
scale:1.15
}}

transition={

{
duration:15,
repeat:Infinity,
repeatType:"reverse"
}

}

className="
absolute
inset-0
"

>


<Image

src="/images/couple.jpg"

alt="Ubay & Luluk Wedding"

fill

priority

sizes="100vw"

className="
object-cover
object-center
"

/>


</motion.div>



{/* Overlay */}

<div

className="
absolute
inset-0
bg-black/40
"

/>



<FloatingPetals/>



{/* Content */}

<div

className="
relative
z-10
text-center
max-w-xl
"

>



<motion.p

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

className="
tracking-[0.3em]
md:tracking-[0.5em]
uppercase
text-xs
md:text-sm
"

>

The Wedding Of

</motion.p>





<motion.h1

initial={{
opacity:0,
scale:0.8
}}

animate={{
opacity:1,
scale:1
}}

transition={{
delay:.5,
duration:1
}}

className="
font-serif
text-4xl
md:text-6xl
mt-6
leading-tight
"

>

Ubay

<br className="md:hidden"/>

&

<br className="md:hidden"/>

Luluk

</motion.h1>





<motion.p

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
delay:1
}}

className="
mt-5
text-sm
md:text-base
"

>

02 Oktober 2026

</motion.p>





<div

className="
mt-8
md:mt-10
"

>

<Countdown/>

</div>





<motion.div

animate={{
y:[0,10,0]
}}

transition={{
duration:2,
repeat:Infinity
}}

className="
mt-10
md:mt-14
"

>

↓

<br/>

<span

className="
text-xs
tracking-widest
"

>

SCROLL

</span>


</motion.div>



</div>


</section>

)

}