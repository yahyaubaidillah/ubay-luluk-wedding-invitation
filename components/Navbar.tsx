"use client"


import {
useEffect,
useState
} from "react"


import {
motion,
AnimatePresence
} from "framer-motion"



const menus=[

{
name:"Couple",
href:"#couple"
},

{
name:"Story",
href:"#story"
},

{
name:"Event",
href:"#event"
},

{
name:"Gallery",
href:"#gallery"
},

{
name:"Gift",
href:"#gift"
},

{
name:"RSVP",
href:"#rsvp"
}

]



export default function Navbar(){


const [scrolled,setScrolled]=useState(false)

const [visible,setVisible]=useState(true)


useEffect(()=>{


let lastScroll=window.scrollY



function handleScroll(){


const currentScroll=
window.scrollY



// background navbar

if(currentScroll>80){

setScrolled(true)

}else{

setScrolled(false)

}



// hide/show navbar

if(currentScroll>lastScroll && currentScroll>200){

setVisible(false)

}

else{

setVisible(true)

}



lastScroll=currentScroll



}



window.addEventListener(
"scroll",
handleScroll
)



return()=>{

window.removeEventListener(
"scroll",
handleScroll
)

}



},[])



return(


<AnimatePresence>


{

visible &&

<motion.nav


initial={{
y:-100,
opacity:0
}}

animate={{
y:0,
opacity:1
}}

exit={{
y:-100,
opacity:0
}}

transition={{
duration:0.4
}}



className={`

fixed

top-0

left-0

w-full

z-50

transition-all

duration-500


${

scrolled

?

"bg-white/80 backdrop-blur-xl shadow-md text-neutral-800"

:

"bg-transparent text-white"

}


`}


>


<div

className="

max-w-6xl

mx-auto

px-6

py-5

flex

justify-center

gap-8

"

>



{

menus.map((item)=>(


<a

key={item.name}

href={item.href}

className="

text-sm

tracking-widest

uppercase

hover:opacity-60

transition

"

>

{item.name}

</a>


))


}



</div>



</motion.nav>


}



</AnimatePresence>


)

}