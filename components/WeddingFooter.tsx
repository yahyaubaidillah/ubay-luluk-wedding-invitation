"use client"

import Image from "next/image"


export default function WeddingFooter(){

return(

<footer
className="
relative
mt-12
md:mt-20
w-full
overflow-hidden
bg-[#f8f3ea]
"
>

<div
className="
absolute
inset-x-0
top-0
h-24
bg-gradient-to-b
from-[#f7f3ec]
to-transparent
z-10
"
/>


<div
className="
relative
mx-auto
w-full
"
>


<Image

src="/images/wedding-footer.webp"

alt="Wedding memory footer"

width={1800}

height={600}

priority={false}

className="
h-auto
w-full
object-cover
"
/>


</div>


</footer>

)

}