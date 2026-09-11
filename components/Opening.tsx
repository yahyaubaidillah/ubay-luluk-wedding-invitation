"use client"

import Image from "next/image"

import {
motion,
AnimatePresence
} from "framer-motion"


import {
useState
} from "react"




interface OpeningProps {

onOpen:()=>void

}





export default function Opening({

onOpen

}:OpeningProps){



const [
isClosing,
setIsClosing
]=useState(false)




function handleOpen(){


if(isClosing)
return



setIsClosing(true)



setTimeout(()=>{

onOpen()

},1700)



}







return(


<AnimatePresence>


<motion.section



initial={{
opacity:0
}}


animate={{
opacity:1
}}


exit={{
opacity:0
}}


transition={{

duration:0.8

}}



className="

fixed

inset-0

min-h-[100dvh]

z-[100]

flex

items-center

justify-center

overflow-hidden

bg-[#1a1512]

"


>







{/* Background */}



<motion.div

initial={{
scale:1.2,
filter:"blur(25px)"
}}

animate={{
scale:1,
filter:"blur(0px)"
}}

transition={{
duration:2.5
}}

className="
absolute
inset-0
"

>


<Image

src="/images/wedding-cover.jpg"

alt="Ubay & Luluk Wedding Invitation"

fill

priority

sizes="100vw"

className="
object-cover
object-center
"

/>


</motion.div>








{/* Dark overlay */}



<div

className="

absolute

inset-0

bg-black/50

"

/>










{/* LEFT DOOR */}



<motion.div



animate={

isClosing

?

{

x:"-100%"

}

:

{

x:0

}

}



transition={{

duration:1.5,

ease:[0.65,0,0.35,1]

}}



className="

absolute

left-0

top-0

h-full

w-1/2

bg-[#201915]

z-20

"

/>










{/* RIGHT DOOR */}



<motion.div



animate={

isClosing

?

{

x:"100%"

}

:

{

x:0

}

}



transition={{

duration:1.5,

ease:[0.65,0,0.35,1]

}}



className="

absolute

right-0

top-0

h-full

w-1/2

bg-[#201915]

z-20

"

/>









{/* CONTENT */}



<motion.div


className="

relative

z-30

text-center

text-white

px-6

"



animate={

isClosing

?

{

scale:0.95,

opacity:0

}

:

{

scale:1,

opacity:1

}

}


transition={{

duration:1

}}



>








<motion.p



initial={{

opacity:0,

y:20

}}



animate={{

opacity:1,

y:0

}}



transition={{

delay:.5,

duration:1

}}



className="

tracking-[0.4em]

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

y:40

}}



animate={{

opacity:1,

y:0

}}



transition={{

delay:1,

duration:1

}}



className="

mt-6

font-serif

text-5xl

md:text-7xl

"



>

Ubay

</motion.h1>







<motion.span



initial={{

opacity:0

}}



animate={{

opacity:1

}}



transition={{

delay:1.5

}}



className="

block

my-3

text-3xl

"



>

&

</motion.span>








<motion.h1



initial={{

opacity:0,

y:40

}}



animate={{

opacity:1,

y:0

}}



transition={{

delay:1.8,

duration:1

}}



className="

font-serif

text-5xl

md:text-7xl

"



>

Luluk

</motion.h1>









{/* BUTTON */}



<motion.button



initial={{

opacity:0,

scale:.8

}}



animate={{

opacity:1,

scale:1

}}



transition={{

delay:2.5,

duration:.8

}}



whileHover={{

scale:1.08

}}



whileTap={{

scale:.95

}}




onClick={handleOpen}



className="

relative

mt-12

rounded-full

border

border-white/50

px-10

py-4

bg-white/10

backdrop-blur-md

overflow-hidden

group

"

>



{/* Glow animation */}



<motion.span


animate={{

opacity:[0.2,0.7,0.2]

}}


transition={{

duration:2,

repeat:Infinity

}}



className="

absolute

inset-0

bg-white/30

blur-xl

"


/>





<span

className="

relative

z-10

tracking-widest

text-sm

"

>

Open Invitation

</span>




</motion.button>








</motion.div>






</motion.section>



</AnimatePresence>



)

}