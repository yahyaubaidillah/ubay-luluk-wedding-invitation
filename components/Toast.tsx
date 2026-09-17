"use client"

import {
motion,
AnimatePresence
} from "framer-motion"


interface ToastProps{

show:boolean

title:string

message:string

}



export default function Toast({

show,
title,
message

}:ToastProps){


return(

<AnimatePresence>


{
show &&

<motion.div

initial={{
opacity:0,
y:50,
scale:.9
}}

animate={{
opacity:1,
y:0,
scale:1
}}

exit={{
opacity:0,
y:50,
scale:.9
}}

transition={{
duration:.4
}}

className="
fixed
bottom-8
left-1/2
-translate-x-1/2
z-[200]

w-[90%]
max-w-sm

"

>


<div

className="
relative

bg-[#fffaf0]

border

border-[#d8c8ad]

rounded-2xl

shadow-[0_20px_60px_rgba(0,0,0,.18)]

px-8
py-6

text-center

backdrop-blur-xl

"

>


{/* ornamen klasik */}

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


<div
className="
absolute
bottom-3
right-3
w-5
h-5

border-b
border-r

border-[#c9ae7d]
"
/>



<p

className="
font-serif
text-xl
text-[#4b3a2a]
"

>

✦ {title}

</p>



<p

className="
mt-3
text-sm
text-gray-500
leading-relaxed
"

>

{message}

</p>



<p

className="
mt-4
text-xs
tracking-widest
text-[#b08d57]
uppercase
"

>

Ubay & Luluk

</p>



</div>


</motion.div>

}


</AnimatePresence>

)

}